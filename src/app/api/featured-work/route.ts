import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { FeaturedWorkItem } from "@/data/agencyData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "featuredWork.json");
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

async function readFeaturedWorks(): Promise<FeaturedWorkItem[]> {
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

async function writeFeaturedWorks(items: FeaturedWorkItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

// GET: Fetch all featured work items
export async function GET() {
  try {
    const items = await readFeaturedWorks();
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json({ success: true, items }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load featured work" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add or update a featured work card
export async function POST(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || !body.title || !body.domain) {
      return NextResponse.json({ success: false, message: "Title and Domain are required" }, { status: 400 });
    }

    const works = await readFeaturedWorks();

    // Process image if base64
    let image = body.image || "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_480.webp";
    if (image.startsWith("data:image/")) {
      image = await saveBase64Image(image, "portfolio", "featured_work");
    }

    const featuredId = body.id || `featured-${Date.now()}`;
    const existingIndex = works.findIndex((w) => w.id === featuredId);

    const featuredItem: FeaturedWorkItem = {
      id: featuredId,
      title: body.title.trim(),
      domain: body.domain.trim(),
      tagline: body.tagline ? body.tagline.trim() : undefined,
      image,
      domainLink: body.domainLink || "/services/web-development",
      order: typeof body.order === "number" ? body.order : works.length + 1,
    };

    if (existingIndex >= 0) {
      works[existingIndex] = featuredItem;
    } else {
      works.push(featuredItem);
    }

    await writeFeaturedWorks(works);
    return NextResponse.json({ success: true, item: featuredItem }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save featured work" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// PUT: Update order or single item
export async function PUT(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Check if reordering list: { items: FeaturedWorkItem[] }
    if (Array.isArray(body.items)) {
      await writeFeaturedWorks(body.items);
      return NextResponse.json({ success: true, items: body.items }, { headers: NO_CACHE_HEADERS });
    }

    // Otherwise single item update
    if (body.id) {
      return POST(request);
    }

    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update featured work" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// DELETE: Remove a featured work card by ID
export async function DELETE(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Showcase ID is required" }, { status: 400 });
    }

    const works = await readFeaturedWorks();
    const filtered = works.filter((w) => w.id !== id);

    if (filtered.length === works.length) {
      return NextResponse.json({ success: false, message: "Showcase card not found" }, { status: 404 });
    }

    await writeFeaturedWorks(filtered);
    return NextResponse.json({ success: true, message: "Showcase card removed successfully" }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete showcase" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
