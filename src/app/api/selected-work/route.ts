import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { SelectedWorkItem, DEFAULT_SELECTED_WORK } from "@/data/agencyData";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "selectedWork.json");

function normalizeShowcaseImagePath(src: string): string {
  if (!src) return "/images/portfolio/apex_ecommerce.jpg";
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  let p = src.trim();
  if (p.startsWith("opt/")) {
    const parts = p.split("/");
    const hash = parts[1] || "";
    return `/images/selected_work/${hash}_480.webp`;
  }
  if (p.includes("/images/selected_work/")) {
    return p.replace(/_\d+\.webp$/, "_480.webp");
  }
  if (!p.startsWith("/")) {
    p = "/" + p;
  }
  return p;
}

async function readSelectedWork(): Promise<SelectedWorkItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const items = JSON.parse(data);
    if (Array.isArray(items)) {
      return items.map((i: SelectedWorkItem) => ({
        ...i,
        src: normalizeShowcaseImagePath(i.src),
      }));
    }
    return [];
  } catch (err: unknown) {
    // Only seed defaults when selectedWork.json doesn't exist yet on disk
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") {
      return DEFAULT_SELECTED_WORK.map((i: SelectedWorkItem) => ({
        ...i,
        src: normalizeShowcaseImagePath(i.src),
      }));
    }
    return [];
  }
}

async function writeSelectedWork(items: SelectedWorkItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

// GET: Fetch all selected work showcases
export async function GET() {
  try {
    const items = await readSelectedWork();
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json({ success: true, items }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load selected work" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add new showcase (Admin Only)
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, src, alt, isVideo, videoSrc } = body;

    if (!title || !src) {
      return NextResponse.json(
        { success: false, message: "Title and Image Source URL are required." },
        { status: 400 }
      );
    }

    const items = await readSelectedWork();
    const newId = `showcase-${Date.now()}`;
    const nextOrder = items.length > 0 ? Math.max(...items.map((i) => i.order || 0)) + 1 : 1;

    const newItem: SelectedWorkItem = {
      id: newId,
      title: title.trim(),
      src: normalizeShowcaseImagePath(src.trim()),
      alt: (alt || title).trim(),
      isVideo: Boolean(isVideo),
      videoSrc: videoSrc ? videoSrc.trim() : undefined,
      order: nextOrder,
    };

    items.push(newItem);
    await writeSelectedWork(items);

    return NextResponse.json({ success: true, item: newItem, items });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to add showcase" },
      { status: 500 }
    );
  }
}

// PUT: Update existing showcase or reorder (Admin Only)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Check if updating an array (reordering)
    if (Array.isArray(body.items)) {
      const normalized = body.items.map((item: SelectedWorkItem) => ({
        ...item,
        src: normalizeShowcaseImagePath(item.src),
      }));
      await writeSelectedWork(normalized);
      return NextResponse.json({ success: true, items: normalized }, { headers: NO_CACHE_HEADERS });
    }

    const { id, title, src, alt, isVideo, videoSrc, order } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Showcase ID is required." },
        { status: 400 }
      );
    }

    const items = await readSelectedWork();
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Showcase item not found." },
        { status: 404 }
      );
    }

    items[index] = {
      ...items[index],
      title: title !== undefined ? title.trim() : items[index].title,
      src: src !== undefined ? normalizeShowcaseImagePath(src.trim()) : items[index].src,
      alt: alt !== undefined ? alt.trim() : items[index].alt,
      isVideo: isVideo !== undefined ? Boolean(isVideo) : items[index].isVideo,
      videoSrc: videoSrc !== undefined ? videoSrc.trim() : items[index].videoSrc,
      order: order !== undefined ? Number(order) : items[index].order,
    };

    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    await writeSelectedWork(items);

    return NextResponse.json({ success: true, item: items[index], items });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update showcase" },
      { status: 500 }
    );
  }
}

// DELETE: Delete showcase (Admin Only)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Showcase ID is required." },
        { status: 400 }
      );
    }

    const items = await readSelectedWork();
    const filtered = items.filter((i) => i.id !== id);

    if (filtered.length === items.length) {
      return NextResponse.json(
        { success: false, message: "Showcase not found." },
        { status: 404 }
      );
    }

    await writeSelectedWork(filtered);
    return NextResponse.json({ success: true, message: "Showcase deleted successfully", items: filtered });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete showcase" },
      { status: 500 }
    );
  }
}
