import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { CapabilityItem } from "@/data/agencyData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const CAPABILITIES_FILE = path.join(process.cwd(), "src", "data", "capabilities.json");
const CONFIG_FILE = path.join(process.cwd(), "src", "data", "adminConfig.json");

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

async function readCapabilities(): Promise<CapabilityItem[]> {
  try {
    const data = await fs.readFile(CAPABILITIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeCapabilities(items: CapabilityItem[]): Promise<void> {
  await fs.writeFile(CAPABILITIES_FILE, JSON.stringify(items, null, 2), "utf-8");
}

// GET: Fetch all capabilities
export async function GET() {
  try {
    const capabilities = await readCapabilities();
    // Sort by track ascending, then order ascending
    capabilities.sort((a, b) => {
      if (a.track !== b.track) return a.track - b.track;
      return (a.order || 0) - (b.order || 0);
    });
    return NextResponse.json({ success: true, capabilities }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch capabilities",
      },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add new capability badge (Admin only)
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, category, track, iconKey, order, active } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Capability / service name is required." },
        { status: 400 }
      );
    }

    if (!category || !category.trim()) {
      return NextResponse.json(
        { success: false, message: "Category tag is required." },
        { status: 400 }
      );
    }

    const capabilities = await readCapabilities();
    const targetTrack = track === 2 ? 2 : 1;
    const itemsInTrack = capabilities.filter((c) => c.track === targetTrack);
    const nextOrder = order !== undefined ? Number(order) : itemsInTrack.length + 1;

    const newCapability: CapabilityItem = {
      id: `cap_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      category: category.trim(),
      track: targetTrack,
      iconKey: (iconKey || "sparkles").trim().toLowerCase(),
      order: nextOrder,
      active: active !== undefined ? Boolean(active) : true,
      createdAt: new Date().toISOString(),
    };

    capabilities.push(newCapability);
    await writeCapabilities(capabilities);

    return NextResponse.json({
      success: true,
      message: `Capability "${newCapability.name}" added successfully!`,
      capability: newCapability,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to save capability",
      },
      { status: 500 }
    );
  }
}

// PUT: Update existing capability badge (Admin only)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, category, track, iconKey, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Capability ID is required." },
        { status: 400 }
      );
    }

    const capabilities = await readCapabilities();
    const index = capabilities.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Capability not found." },
        { status: 404 }
      );
    }

    if (name !== undefined) capabilities[index].name = name.trim();
    if (category !== undefined) capabilities[index].category = category.trim();
    if (track !== undefined) capabilities[index].track = track === 2 ? 2 : 1;
    if (iconKey !== undefined) capabilities[index].iconKey = iconKey.trim().toLowerCase();
    if (order !== undefined) capabilities[index].order = Number(order);
    if (active !== undefined) capabilities[index].active = Boolean(active);

    await writeCapabilities(capabilities);

    return NextResponse.json({
      success: true,
      message: `Capability "${capabilities[index].name}" updated successfully!`,
      capability: capabilities[index],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update capability",
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete capability badge (Admin only)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Capability ID parameter is required." },
        { status: 400 }
      );
    }

    const capabilities = await readCapabilities();
    const filtered = capabilities.filter((c) => c.id !== id);

    if (filtered.length === capabilities.length) {
      return NextResponse.json(
        { success: false, message: "Capability not found." },
        { status: 404 }
      );
    }

    await writeCapabilities(filtered);

    return NextResponse.json({
      success: true,
      message: "Capability removed successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete capability",
      },
      { status: 500 }
    );
  }
}
