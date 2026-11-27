import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { TestimonialItem, TESTIMONIALS_DATA } from "@/data/agencyData";
import { verifyAdminAuth, checkRateLimit, getClientIp } from "@/lib/auth";

export const dynamic = "force-dynamic";

const TESTIMONIALS_FILE = path.join(process.cwd(), "src", "data", "testimonials.json");
const USER_TESTIMONIALS_FILE = path.join(process.cwd(), "src", "data", "userTestimonials.json");

async function readTestimonials(): Promise<TestimonialItem[]> {
  try {
    const data = await fs.readFile(TESTIMONIALS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // If testimonials.json does not exist yet, initialize it
    try {
      let initial: TestimonialItem[] = [...TESTIMONIALS_DATA];
      try {
        const userData = await fs.readFile(USER_TESTIMONIALS_FILE, "utf-8");
        const parsed = JSON.parse(userData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initial = [...parsed, ...initial];
        }
      } catch {
        // ignore
      }
      await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    } catch {
      return [...TESTIMONIALS_DATA];
    }
  }
}

async function writeTestimonials(data: TestimonialItem[]): Promise<boolean> {
  try {
    await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(data, null, 2), "utf-8");
    // Also sync userTestimonials.json for backwards compatibility
    try {
      const userOnly = data.filter((item) => item.isUserSubmitted);
      await fs.writeFile(USER_TESTIMONIALS_FILE, JSON.stringify(userOnly, null, 2), "utf-8");
    } catch {
      // ignore secondary write error
    }
    return true;
  } catch (error) {
    console.error("Error writing testimonials.json:", error);
    return false;
  }
}

// GET: Retrieve all active testimonials
export async function GET() {
  const testimonials = await readTestimonials();
  return NextResponse.json({ success: true, testimonials });
}

// POST: Add new testimonial (either Admin CMS or Client Submission)
export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminAuth(request);

    // Rate limit public review submissions: max 5 reviews per hour per IP
    if (!isAdmin) {
      const clientIp = getClientIp(request);
      const rateCheck = checkRateLimit(`feedback_${clientIp}`, 5, 60 * 60 * 1000);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          { success: false, error: `Too many submissions. Please wait ${rateCheck.resetSeconds} seconds before submitting again.` },
          { status: 429 }
        );
      }
    }

    const body = await request.json();
    const { name, company, role, service, tag, rating, quote, avatar, platform, isUserSubmitted } = body;

    // Validate input fields
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid client name." },
        { status: 400 }
      );
    }

    if (!quote || quote.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide detailed feedback (at least 10 characters)." },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, Number(rating) || 5));
    const cleanName = name.replace(/<[^>]*>?/gm, "").trim();
    const cleanCompany = (company || "Verified Client").replace(/<[^>]*>?/gm, "").trim();
    const cleanRole = (role || "Client").replace(/<[^>]*>?/gm, "").trim();
    const cleanService = (tag || service || "Digital Services").replace(/<[^>]*>?/gm, "").trim();
    const cleanQuote = quote.replace(/<[^>]*>?/gm, "").trim();

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      cleanName
    )}&background=7545F5&color=fff&bold=true`;

    const newTestimonial: TestimonialItem = {
      id: isAdmin
        ? `review_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
        : `client_${Date.now()}`,
      name: cleanName,
      handle: `@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      role: cleanRole,
      company: cleanCompany,
      avatar:
        avatar && typeof avatar === "string" && (avatar.startsWith("http") || avatar.startsWith("data:image"))
          ? avatar
          : defaultAvatar,
      quote: cleanQuote,
      rating: numericRating,
      tag: cleanService,
      platform: (platform as "linkedin" | "twitter" | "verified") || (isAdmin ? "verified" : "verified"),
      createdAt: new Date().toISOString(),
      isUserSubmitted: isAdmin ? (Boolean(isUserSubmitted)) : true,
    };

    const currentList = await readTestimonials();
    currentList.unshift(newTestimonial);
    await writeTestimonials(currentList);

    return NextResponse.json({
      success: true,
      message: isAdmin ? "New review added successfully!" : "Testimonial verified and published successfully!",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("API Feedback Submission Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing feedback." },
      { status: 500 }
    );
  }
}

// PUT: Update an existing testimonial (Admin Only)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, company, role, service, tag, rating, quote, avatar, platform, isUserSubmitted } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required for update." },
        { status: 400 }
      );
    }

    const currentList = await readTestimonials();
    const index = currentList.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    const existing = currentList[index];
    const cleanName = (name || existing.name).replace(/<[^>]*>?/gm, "").trim();
    const cleanCompany = (company !== undefined ? company : existing.company).replace(/<[^>]*>?/gm, "").trim();
    const cleanRole = (role !== undefined ? role : existing.role).replace(/<[^>]*>?/gm, "").trim();
    const cleanService = (tag || service || existing.tag).replace(/<[^>]*>?/gm, "").trim();
    const cleanQuote = (quote || existing.quote).replace(/<[^>]*>?/gm, "").trim();
    const numericRating = rating !== undefined ? Math.min(5, Math.max(1, Number(rating) || 5)) : existing.rating;

    currentList[index] = {
      ...existing,
      name: cleanName,
      handle: `@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      company: cleanCompany,
      role: cleanRole,
      tag: cleanService,
      quote: cleanQuote,
      rating: numericRating,
      avatar: avatar || existing.avatar,
      platform: platform || existing.platform || "verified",
      isUserSubmitted: isUserSubmitted !== undefined ? isUserSubmitted : existing.isUserSubmitted,
    };

    await writeTestimonials(currentList);

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully!",
      testimonial: currentList[index],
    });
  } catch (error) {
    console.error("API Feedback Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error updating testimonial." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a testimonial (Admin Only)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // no body
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Review ID parameter is required." },
        { status: 400 }
      );
    }

    const currentList = await readTestimonials();
    const initialLength = currentList.length;
    const filtered = currentList.filter((item) => item.id !== id);

    if (filtered.length === initialLength) {
      return NextResponse.json(
        { success: false, error: "Testimonial with specified ID was not found." },
        { status: 404 }
      );
    }

    await writeTestimonials(filtered);

    return NextResponse.json({
      success: true,
      message: "Review successfully deleted and removed from website testimonials.",
      deletedId: id,
      remainingCount: filtered.length,
    });
  } catch (error) {
    console.error("API Feedback Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error deleting testimonial." },
      { status: 500 }
    );
  }
}
