import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, description } = body;

    // Strict Server-Side Validation
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

    // In production, send via SendGrid, Resend, or corporate SMTP:
    console.log("[UNIQUOVA Lead Received]:", {
      name,
      email,
      phone: phone || "Not provided",
      company: company || "Not provided",
      service,
      description,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your project inquiry has been received. Our strategy team will reach out within 24 hours.",
        leadId: `UQ-${Date.now().toString(36).toUpperCase()}`,
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

