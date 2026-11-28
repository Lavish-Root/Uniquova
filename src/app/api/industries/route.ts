import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { IndustryItem } from "@/data/agencyData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "industries.json");
const CONFIG_FILE = path.join(process.cwd(), "src", "data", "adminConfig.json");

async function saveBase64Image(dataUri: string, folder: string, prefix: string): Promise<string> {
  if (!dataUri || typeof dataUri !== "string" || !dataUri.startsWith("data:image/")) {
    return dataUri;
  }
  const match = dataUri.match(/^data:image\/([a-zA-Z0-9+-]+);base64,(.+)$/);
  if (!match) return dataUri;
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
  const targetDir = path.join(process.cwd(), "public", "images", folder);
  await fs.mkdir(targetDir, { recursive: true });
  const targetPath = path.join(targetDir, filename);
  const buffer = Buffer.from(match[2], "base64");
  await fs.writeFile(targetPath, buffer);
  return `/images/${folder}/${filename}`;
}

async function getAdminPassword(): Promise<string> {
  let savedPassword = process.env.ADMIN_PASSWORD || "UNIQOVA_ADMIN_2026";
  try {
    const data = await fs.readFile(CONFIG_FILE, "utf-8");
    const config = JSON.parse(data);
    if (config.password) {
      savedPassword = config.password;
    }
  } catch {
    // fallback
  }
  return savedPassword;
}

async function verifyAuth(request: Request): Promise<boolean> {
  const adminPassword = request.headers.get("x-admin-password");
  if (!adminPassword) return false;
  const currentPassword = await getAdminPassword();
  return adminPassword === currentPassword;
}

async function readIndustries(): Promise<IndustryItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const items = JSON.parse(data);
    if (Array.isArray(items)) {
      return items;
    }
    return [];
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") {
      return [];
    }
    return [];
  }
}

async function writeIndustries(items: IndustryItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

// GET: Fetch all industry items
export async function GET() {
  try {
    const items = await readIndustries();
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json({ success: true, industries: items }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load industries" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add or update an industry framework
export async function POST(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || !body.title || !body.id) {
      return NextResponse.json({ success: false, message: "Sector ID and Title are required" }, { status: 400 });
    }

    const industries = await readIndustries();

    // Process image if base64
    let image = body.image || "/images/industries/ecommerce.jpg";
    if (image.startsWith("data:image/")) {
      image = await saveBase64Image(image, "industries", "industry_cover");
    }

    const industryId = body.id.trim();
    const existingIndex = industries.findIndex((i) => i.id === industryId);

    const industryItem: IndustryItem = {
      id: industryId,
      title: body.title.trim(),
      tag: body.tag ? body.tag.trim() : "Specialized Sector",
      icon: body.icon || "ShoppingBag",
      image,
      order: typeof body.order === "number" ? body.order : industries.length + 1,
      accent: body.accent || {
        bg: "from-emerald-500/10 via-purple-500/5 to-transparent",
        border: "border-emerald-500/20",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        badgeText: "text-emerald-600",
        glow: "rgba(16, 185, 129, 0.15)",
      },
      description: body.description || "",
      solutions: Array.isArray(body.solutions) ? body.solutions : [],
      metrics: Array.isArray(body.metrics) ? body.metrics : [],
      floatingBadges: Array.isArray(body.floatingBadges) ? body.floatingBadges : [],
      whyUniquova: Array.isArray(body.whyUniquova) ? body.whyUniquova : [],
    };

    if (existingIndex >= 0) {
      industries[existingIndex] = industryItem;
    } else {
      industries.push(industryItem);
    }

    await writeIndustries(industries);
    return NextResponse.json({ success: true, industry: industryItem }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save industry" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// PUT: Reorder industries or update single item
export async function PUT(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Check if reordering list: { industries: IndustryItem[] }
    if (Array.isArray(body.industries)) {
      await writeIndustries(body.industries);
      return NextResponse.json({ success: true, industries: body.industries }, { headers: NO_CACHE_HEADERS });
    }

    // Otherwise single item update
    if (body.id) {
      return POST(request);
    }

    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update industry" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// DELETE: Remove an industry by ID
export async function DELETE(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Industry ID is required" }, { status: 400 });
    }

    const industries = await readIndustries();
    const filtered = industries.filter((i) => i.id !== id);

    if (filtered.length === industries.length) {
      return NextResponse.json({ success: false, message: "Industry not found" }, { status: 404 });
    }

    await writeIndustries(filtered);
    return NextResponse.json({ success: true, message: "Industry removed successfully" }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete industry" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
