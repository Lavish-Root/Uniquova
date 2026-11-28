import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { CoreServiceItem, ServiceTag } from "@/data/agencyData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "coreServices.json");
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

async function readServices(): Promise<CoreServiceItem[]> {
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

async function writeServices(items: CoreServiceItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

// GET: Fetch all core digital services
export async function GET() {
  try {
    const items = await readServices();
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json({ success: true, services: items }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load services" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add or update a service
export async function POST(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || !body.title || !body.domain) {
      return NextResponse.json({ success: false, message: "Domain and Title are required" }, { status: 400 });
    }

    const services = await readServices();

    // Process defaultImage if base64
    let defaultImage = body.defaultImage || "/images/services/web_dev_bg.jpg";
    if (defaultImage.startsWith("data:image/")) {
      defaultImage = await saveBase64Image(defaultImage, "services", "service_cover");
    }

    // Process tags if any have base64 images
    const processedTags: ServiceTag[] = [];
    if (Array.isArray(body.tags)) {
      for (let i = 0; i < body.tags.length; i++) {
        const tag = body.tags[i];
        let tagImg = tag.image || defaultImage;
        if (tagImg.startsWith("data:image/")) {
          tagImg = await saveBase64Image(tagImg, "services", `service_tag_${i}`);
        }
        processedTags.push({
          label: tag.label || "",
          image: tagImg,
        });
      }
    }

    const serviceId = body.id || `service-${Date.now()}`;
    const existingIndex = services.findIndex((s) => s.id === serviceId);

    const serviceItem: CoreServiceItem = {
      id: serviceId,
      slug: body.slug || serviceId.replace(/[^a-z0-9-]/gi, "").toLowerCase(),
      domain: body.domain.trim(),
      title: body.title.trim(),
      defaultImage,
      link: body.link || `/services/${body.slug || serviceId}`,
      order: typeof body.order === "number" ? body.order : services.length + 1,
      tags: processedTags,
    };

    if (existingIndex >= 0) {
      services[existingIndex] = serviceItem;
    } else {
      services.push(serviceItem);
    }

    await writeServices(services);
    return NextResponse.json({ success: true, service: serviceItem }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save core service" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// PUT: Update a single service or reorder list
export async function PUT(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Check if reordering list: { services: CoreServiceItem[] }
    if (Array.isArray(body.services)) {
      await writeServices(body.services);
      return NextResponse.json({ success: true, services: body.services }, { headers: NO_CACHE_HEADERS });
    }

    // Otherwise single item update
    if (body.id) {
      return POST(request);
    }

    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update service" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// DELETE: Remove a service by ID
export async function DELETE(request: Request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Service ID is required" }, { status: 400 });
    }

    const services = await readServices();
    const filtered = services.filter((s) => s.id !== id);

    if (filtered.length === services.length) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    await writeServices(filtered);
    return NextResponse.json({ success: true, message: "Service removed successfully" }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete service" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
