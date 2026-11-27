import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { BrandPartnerItem } from "@/data/agencyData";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const BRANDS_FILE = path.join(process.cwd(), "src", "data", "brands.json");

async function readBrands(): Promise<BrandPartnerItem[]> {
  try {
    const data = await fs.readFile(BRANDS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeBrands(brands: BrandPartnerItem[]): Promise<void> {
  await fs.writeFile(BRANDS_FILE, JSON.stringify(brands, null, 2), "utf-8");
}

// GET: Fetch all brands
export async function GET() {
  try {
    const brands = await readBrands();
    // Sort by order ascending
    brands.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json({ success: true, brands }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch brands" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add new brand (Admin only)
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, logoUrl, alt, websiteUrl, order, active } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Brand name is required." },
        { status: 400 }
      );
    }

    if (!logoUrl || !logoUrl.trim()) {
      return NextResponse.json(
        { success: false, message: "Brand logo URL or image upload is required." },
        { status: 400 }
      );
    }

    const brands = await readBrands();
    const nextOrder = order !== undefined ? Number(order) : brands.length + 1;

    const newBrand: BrandPartnerItem = {
      id: `brand_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      logoUrl: logoUrl.trim(),
      alt: alt?.trim() || `${name.trim()} — Trusted Partner of UNIQUOVA`,
      websiteUrl: websiteUrl?.trim() || "",
      order: nextOrder,
      active: active !== undefined ? Boolean(active) : true,
      createdAt: new Date().toISOString(),
    };

    brands.push(newBrand);
    await writeBrands(brands);

    return NextResponse.json({
      success: true,
      message: "Brand partner added successfully",
      brand: newBrand,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to create brand" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing brand (Admin only)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, logoUrl, alt, websiteUrl, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Brand ID is required for update." },
        { status: 400 }
      );
    }

    const brands = await readBrands();
    const index = brands.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Brand not found." },
        { status: 404 }
      );
    }

    brands[index] = {
      ...brands[index],
      name: name !== undefined ? name.trim() : brands[index].name,
      logoUrl: logoUrl !== undefined ? logoUrl.trim() : brands[index].logoUrl,
      alt: alt !== undefined ? alt.trim() : brands[index].alt,
      websiteUrl: websiteUrl !== undefined ? websiteUrl.trim() : brands[index].websiteUrl,
      order: order !== undefined ? Number(order) : brands[index].order,
      active: active !== undefined ? Boolean(active) : brands[index].active,
    };

    await writeBrands(brands);

    return NextResponse.json({
      success: true,
      message: "Brand partner updated successfully",
      brand: brands[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update brand" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a brand (Admin only)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
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
        { success: false, message: "Brand ID query parameter is required." },
        { status: 400 }
      );
    }

    const brands = await readBrands();
    const filtered = brands.filter((b) => b.id !== id);

    if (filtered.length === brands.length) {
      return NextResponse.json(
        { success: false, message: "Brand not found." },
        { status: 404 }
      );
    }

    await writeBrands(filtered);

    return NextResponse.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete brand" },
      { status: 500 }
    );
  }
}
