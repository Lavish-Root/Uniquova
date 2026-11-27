import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { sendLeadNotificationEmail } from "@/lib/email";
import { ClientQuery } from "@/data/agencyData";
import { verifyAdminAuth, getAdminEmail, checkRateLimit, getClientIp } from "@/lib/auth";

export const dynamic = "force-dynamic";

const QUERIES_FILE = path.join(process.cwd(), "src", "data", "queries.json");

async function readQueries(): Promise<ClientQuery[]> {
  try {
    const data = await fs.readFile(QUERIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeQueries(queries: ClientQuery[]): Promise<void> {
  await fs.writeFile(QUERIES_FILE, JSON.stringify(queries, null, 2), "utf-8");
}

// ==============================================================
// GET: Fetch all inquiries/queries (Admin Only)
// ==============================================================
export async function GET(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const queries = await readQueries();
    return NextResponse.json({ success: true, queries });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load queries." },
      { status: 500 }
    );
  }
}

// ==============================================================
// POST: Submit new inquiry (Public & CTA)
// ==============================================================
export async function POST(request: Request) {
  try {
    // Rate limit public lead submission: max 5 requests per 10 minutes per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`contact_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateCheck.resetSeconds} seconds before submitting again or reach out directly on WhatsApp.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, service, description, source } = body;

    // Special handler for WhatsApp CTA click tracking
    if (source === "whatsapp_cta") {
      const leadId = `WA-${Date.now().toString(36).toUpperCase()}`;
      const newQuery: ClientQuery = {
        id: leadId,
        name: name?.trim() || "WhatsApp Chat Visitor",
        email: email?.trim() || "whatsapp.lead@uniquova.com",
        phone: phone?.trim() || "Pending conversation",
        company: company?.trim() || "Direct WhatsApp Inquirer",
        service: service?.trim() || "WhatsApp Direct Consultation",
        description: description?.trim() || "Client clicked 'Chat on WhatsApp' from 'Have an Idea? Let's Make It Happen' CTA banner.",
        source: "whatsapp_cta",
        status: "new",
        notes: "Initiated via WhatsApp button.",
        receivedAt: new Date().toISOString(),
      };

      const queries = await readQueries();
      queries.unshift(newQuery);
      await writeQueries(queries);

      return NextResponse.json(
        {
          success: true,
          leadId,
          message: "WhatsApp inquiry registered successfully.",
        },
        { status: 200 }
      );
    }

    // Strict Server-Side Validation for contact forms
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { error: "Please select the service required." },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please describe your project requirements in at least 10 characters." },
        { status: 400 }
      );
    }

    const leadId = `UQ-${Date.now().toString(36).toUpperCase()}`;
    const cleanName = name.replace(/<[^>]*>?/gm, "").trim();
    const cleanEmail = email.trim();
    const cleanPhone = (phone || "").replace(/<[^>]*>?/gm, "").trim();
    const cleanCompany = (company || "Direct Client").replace(/<[^>]*>?/gm, "").trim();
    const cleanService = service.trim();
    const cleanDescription = description.replace(/<[^>]*>?/gm, "").trim();

    const newQuery: ClientQuery = {
      id: leadId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone || undefined,
      company: cleanCompany,
      service: cleanService,
      description: cleanDescription,
      source: (source as "contact_modal" | "contact_page" | "direct") || "contact_modal",
      status: "new",
      notes: "",
      receivedAt: new Date().toISOString(),
    };

    // 1. Store in persistent database
    const queries = await readQueries();
    queries.unshift(newQuery);
    await writeQueries(queries);

    // 2. Dispatch email notification to administrator in background
    getAdminEmail().then((adminEmail) => {
      sendLeadNotificationEmail({
        toEmail: adminEmail,
        lead: {
          id: leadId,
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          company: cleanCompany,
          service: cleanService,
          description: cleanDescription,
          source: newQuery.source,
        },
      }).catch((err) => console.error("Error dispatching lead notification email:", err));
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your project inquiry has been received. Our strategy team will reach out within 24 hours.",
        leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}

// ==============================================================
// PATCH: Update query status / notes (Admin Only)
// ==============================================================
export async function PATCH(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Query ID is required for update." },
        { status: 400 }
      );
    }

    const queries = await readQueries();
    const index = queries.findIndex((q) => q.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Query not found." },
        { status: 404 }
      );
    }

    if (status) {
      queries[index].status = status;
    }
    if (notes !== undefined) {
      queries[index].notes = notes;
    }

    await writeQueries(queries);

    return NextResponse.json({
      success: true,
      message: "Query updated successfully.",
      query: queries[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update query." },
      { status: 500 }
    );
  }
}

// ==============================================================
// DELETE: Delete a query (Admin Only)
// ==============================================================
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Query ID is required for deletion." },
        { status: 400 }
      );
    }

    const queries = await readQueries();
    const filtered = queries.filter((q) => q.id !== id);

    if (queries.length === filtered.length) {
      return NextResponse.json(
        { success: false, message: "Query not found." },
        { status: 404 }
      );
    }

    await writeQueries(filtered);

    return NextResponse.json({
      success: true,
      message: "Query deleted successfully.",
      deletedId: id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete query." },
      { status: 500 }
    );
  }
}
