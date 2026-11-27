import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { CompanyInfo, DEFAULT_COMPANY_INFO } from "@/data/agencyData";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const COMPANY_INFO_FILE = path.join(process.cwd(), "src", "data", "companyInfo.json");

async function readCompanyInfo(): Promise<CompanyInfo> {
  try {
    const data = await fs.readFile(COMPANY_INFO_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return {
      ...DEFAULT_COMPANY_INFO,
      ...parsed,
      socialLinks: {
        linkedin: {
          url: parsed.socialLinks?.linkedin?.url ?? DEFAULT_COMPANY_INFO.socialLinks?.linkedin?.url ?? "",
          enabled: parsed.socialLinks?.linkedin?.enabled !== undefined ? Boolean(parsed.socialLinks.linkedin.enabled) : true,
        },
        twitter: {
          url: parsed.socialLinks?.twitter?.url ?? DEFAULT_COMPANY_INFO.socialLinks?.twitter?.url ?? "",
          enabled: parsed.socialLinks?.twitter?.enabled !== undefined ? Boolean(parsed.socialLinks.twitter.enabled) : true,
        },
        instagram: {
          url: parsed.socialLinks?.instagram?.url ?? DEFAULT_COMPANY_INFO.socialLinks?.instagram?.url ?? "",
          enabled: parsed.socialLinks?.instagram?.enabled !== undefined ? Boolean(parsed.socialLinks.instagram.enabled) : true,
        },
        facebook: {
          url: parsed.socialLinks?.facebook?.url ?? DEFAULT_COMPANY_INFO.socialLinks?.facebook?.url ?? "",
          enabled: parsed.socialLinks?.facebook?.enabled !== undefined ? Boolean(parsed.socialLinks.facebook.enabled) : true,
        },
      },
    };
  } catch {
    return DEFAULT_COMPANY_INFO;
  }
}

async function writeCompanyInfo(info: CompanyInfo): Promise<void> {
  await fs.writeFile(COMPANY_INFO_FILE, JSON.stringify(info, null, 2), "utf-8");
}

// GET: Fetch company info
export async function GET() {
  try {
    const companyInfo = await readCompanyInfo();
    return NextResponse.json({ success: true, companyInfo }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch company info",
        companyInfo: DEFAULT_COMPANY_INFO,
      },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST or PUT: Update company info (Admin only)
export async function POST(request: Request) {
  return handleUpdate(request);
}

export async function PUT(request: Request) {
  return handleUpdate(request);
}

async function handleUpdate(request: Request) {
  const isAuthorized = await verifyAdminAuth(request);
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Invalid admin password." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const existing = await readCompanyInfo();

    const updated: CompanyInfo = {
      email: typeof body.email === "string" && body.email.trim() ? body.email.trim() : existing.email,
      emailLabel: typeof body.emailLabel === "string" ? body.emailLabel.trim() : existing.emailLabel || "Inquiries & RFPs",
      primaryPhone: typeof body.primaryPhone === "string" && body.primaryPhone.trim() ? body.primaryPhone.trim() : existing.primaryPhone,
      primaryPhoneLabel: typeof body.primaryPhoneLabel === "string" ? body.primaryPhoneLabel.trim() : existing.primaryPhoneLabel || "Mon – Fri, 9am – 6pm IST",
      secondaryPhone: typeof body.secondaryPhone === "string" ? body.secondaryPhone.trim() : existing.secondaryPhone,
      secondaryPhoneLabel: typeof body.secondaryPhoneLabel === "string" ? body.secondaryPhoneLabel.trim() : existing.secondaryPhoneLabel || "Mon – Sat, 9:30 AM – 7:00 PM IST",
      whatsappNumber: typeof body.whatsappNumber === "string" && body.whatsappNumber.trim() ? body.whatsappNumber.trim() : existing.whatsappNumber,
      whatsappMessage: typeof body.whatsappMessage === "string" ? body.whatsappMessage.trim() : existing.whatsappMessage,
      officeName: typeof body.officeName === "string" && body.officeName.trim() ? body.officeName.trim() : existing.officeName,
      address: typeof body.address === "string" && body.address.trim() ? body.address.trim() : existing.address,
      tagline: typeof body.tagline === "string" && body.tagline.trim() ? body.tagline.trim() : existing.tagline,
      socialLinks: {
        linkedin: {
          url: typeof body.socialLinks?.linkedin?.url === "string" ? body.socialLinks.linkedin.url.trim() : (existing.socialLinks?.linkedin?.url ?? "https://linkedin.com"),
          enabled: body.socialLinks?.linkedin?.enabled !== undefined ? Boolean(body.socialLinks.linkedin.enabled) : (existing.socialLinks?.linkedin?.enabled ?? true),
        },
        twitter: {
          url: typeof body.socialLinks?.twitter?.url === "string" ? body.socialLinks.twitter.url.trim() : (existing.socialLinks?.twitter?.url ?? "https://twitter.com"),
          enabled: body.socialLinks?.twitter?.enabled !== undefined ? Boolean(body.socialLinks.twitter.enabled) : (existing.socialLinks?.twitter?.enabled ?? true),
        },
        instagram: {
          url: typeof body.socialLinks?.instagram?.url === "string" ? body.socialLinks.instagram.url.trim() : (existing.socialLinks?.instagram?.url ?? "https://instagram.com"),
          enabled: body.socialLinks?.instagram?.enabled !== undefined ? Boolean(body.socialLinks.instagram.enabled) : (existing.socialLinks?.instagram?.enabled ?? true),
        },
        facebook: {
          url: typeof body.socialLinks?.facebook?.url === "string" ? body.socialLinks.facebook.url.trim() : (existing.socialLinks?.facebook?.url ?? "https://facebook.com"),
          enabled: body.socialLinks?.facebook?.enabled !== undefined ? Boolean(body.socialLinks.facebook.enabled) : (existing.socialLinks?.facebook?.enabled ?? true),
        },
      },
      lastUpdated: new Date().toISOString(),
    };

    await writeCompanyInfo(updated);

    return NextResponse.json(
      {
        success: true,
        message: "Company contact information & brand tagline updated successfully!",
        companyInfo: updated,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update company information",
      },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
