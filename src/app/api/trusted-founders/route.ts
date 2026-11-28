import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { FounderStory, BrandWorkItem } from "@/data/agencyData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const DATA_FILE = path.join(process.cwd(), "src", "data", "trustedFounders.json");
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

async function readFounders(): Promise<FounderStory[]> {
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

async function writeFounders(items: FounderStory[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

function distributeWorkImages(workImages: BrandWorkItem[]) {
  if (!Array.isArray(workImages) || workImages.length === 0) {
    return { col1: [], col2: [] };
  }
  const col1 = workImages.filter((_, i) => i % 2 === 0);
  const col2 = workImages.filter((_, i) => i % 2 !== 0);
  return {
    col1: col1.length > 0 ? col1 : workImages,
    col2: col2.length > 0 ? col2 : workImages,
  };
}

// GET: Fetch all founder stories
export async function GET() {
  try {
    const items = await readFounders();
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json({ success: true, stories: items }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load founder stories" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Add new founder story (Admin Only)
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      companyName,
      companyCategory,
      logoType,
      customLogoUrl,
      quote,
      founderName,
      founderRole,
      founderAvatar,
      projectLink,
      accentColor,
      metrics,
      caseStudySummary,
      workImages,
    } = body;

    if (!companyName || !founderName || !quote) {
      return NextResponse.json(
        { success: false, message: "Company Name, Founder Name, and Quote are required." },
        { status: 400 }
      );
    }

    const items = await readFounders();
    const newId = `founder-${Date.now()}`;
    const nextOrder = items.length > 0 ? Math.max(...items.map((i) => i.order || 0)) + 1 : 1;

    // Process base64 images
    const savedAvatar = founderAvatar
      ? await saveBase64Image(founderAvatar, "trusted_founders", "avatar")
      : "/images/team/team-1.jpg";

    const savedCustomLogo = customLogoUrl
      ? await saveBase64Image(customLogoUrl, "trusted_founders", "logo")
      : undefined;

    const processedWorkImages: BrandWorkItem[] = [];
    if (Array.isArray(workImages)) {
      for (let i = 0; i < workImages.length; i++) {
        const w = workImages[i];
        const savedImg = w.image
          ? await saveBase64Image(w.image, "trusted_founders", "deliverable")
          : "/images/portfolio/apex_ecommerce.jpg";
        processedWorkImages.push({
          id: w.id || `work-${Date.now()}-${i}`,
          companyName: w.companyName || companyName,
          category: w.category || "Deliverable",
          title: w.title || `${companyName} Showcase ${i + 1}`,
          image: savedImg,
          caption: w.caption || w.title || "Showcase",
          quote: w.quote || quote,
          founderName: w.founderName || founderName,
          founderRole: w.founderRole || founderRole,
          metrics: Array.isArray(w.metrics) ? w.metrics : [],
          summary: w.summary || "",
          projectLink: w.projectLink || projectLink || "/our-work",
        });
      }
    }

    const { col1, col2 } = distributeWorkImages(processedWorkImages);

    const newStory: FounderStory = {
      id: newId,
      companyName: companyName.trim(),
      companyCategory: (companyCategory || "AI Brand Transformation").trim(),
      logoType: logoType || "outset",
      customLogoUrl: savedCustomLogo,
      quote: quote.trim(),
      founderName: founderName.trim(),
      founderRole: (founderRole || "Founder & CEO").trim(),
      founderAvatar: savedAvatar,
      projectLink: (projectLink || "/our-work").trim(),
      accentColor: accentColor || "#7545F5",
      metrics: Array.isArray(metrics) ? metrics : [],
      caseStudySummary: (caseStudySummary || "").trim(),
      workImages: processedWorkImages,
      col1Items: col1,
      col2Items: col2,
      order: nextOrder,
      featured: true,
    };

    items.push(newStory);
    await writeFounders(items);

    return NextResponse.json({
      success: true,
      story: newStory,
      message: "Founder story created successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to create founder story" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing founder story or reorder all (Admin Only)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Batch reorder / batch update
    if (body.action === "reorder" && Array.isArray(body.orders)) {
      const items = await readFounders();
      for (const ord of body.orders) {
        const item = items.find((i) => i.id === ord.id);
        if (item) {
          item.order = ord.order;
        }
      }
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      await writeFounders(items);
      return NextResponse.json({ success: true, message: "Stories reordered successfully." });
    }

    const { id } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: "Story ID is required for update." }, { status: 400 });
    }

    const items = await readFounders();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: "Founder story not found." }, { status: 404 });
    }

    const existing = items[index];

    // Process avatar
    let savedAvatar = existing.founderAvatar;
    if (body.founderAvatar && body.founderAvatar !== existing.founderAvatar) {
      savedAvatar = await saveBase64Image(body.founderAvatar, "trusted_founders", "avatar");
    }

    // Process custom logo
    let savedCustomLogo = existing.customLogoUrl;
    if (body.customLogoUrl !== undefined && body.customLogoUrl !== existing.customLogoUrl) {
      savedCustomLogo = body.customLogoUrl
        ? await saveBase64Image(body.customLogoUrl, "trusted_founders", "logo")
        : undefined;
    }

    // Process work images
    let processedWorkImages = existing.workImages;
    if (Array.isArray(body.workImages)) {
      processedWorkImages = [];
      for (let i = 0; i < body.workImages.length; i++) {
        const w = body.workImages[i];
        let savedImg = w.image;
        if (w.image && w.image.startsWith("data:image/")) {
          savedImg = await saveBase64Image(w.image, "trusted_founders", "deliverable");
        }
        processedWorkImages.push({
          id: w.id || `work-${Date.now()}-${i}`,
          companyName: w.companyName || body.companyName || existing.companyName,
          category: w.category || "Deliverable",
          title: w.title || `${body.companyName || existing.companyName} Showcase ${i + 1}`,
          image: savedImg || "/images/portfolio/apex_ecommerce.jpg",
          caption: w.caption || w.title || "Showcase",
          quote: w.quote || body.quote || existing.quote,
          founderName: w.founderName || body.founderName || existing.founderName,
          founderRole: w.founderRole || body.founderRole || existing.founderRole,
          metrics: Array.isArray(w.metrics) ? w.metrics : [],
          summary: w.summary || "",
          projectLink: w.projectLink || body.projectLink || existing.projectLink || "/our-work",
        });
      }
    }

    const { col1, col2 } = distributeWorkImages(processedWorkImages);

    items[index] = {
      ...existing,
      companyName: body.companyName !== undefined ? body.companyName.trim() : existing.companyName,
      companyCategory: body.companyCategory !== undefined ? body.companyCategory.trim() : existing.companyCategory,
      logoType: body.logoType !== undefined ? body.logoType : existing.logoType,
      customLogoUrl: savedCustomLogo,
      quote: body.quote !== undefined ? body.quote.trim() : existing.quote,
      founderName: body.founderName !== undefined ? body.founderName.trim() : existing.founderName,
      founderRole: body.founderRole !== undefined ? body.founderRole.trim() : existing.founderRole,
      founderAvatar: savedAvatar,
      projectLink: body.projectLink !== undefined ? body.projectLink.trim() : existing.projectLink,
      accentColor: body.accentColor !== undefined ? body.accentColor : existing.accentColor,
      metrics: Array.isArray(body.metrics) ? body.metrics : existing.metrics,
      caseStudySummary:
        body.caseStudySummary !== undefined ? body.caseStudySummary.trim() : existing.caseStudySummary,
      workImages: processedWorkImages,
      col1Items: col1,
      col2Items: col2,
      order: body.order !== undefined ? body.order : existing.order,
      featured: body.featured !== undefined ? body.featured : existing.featured,
    };

    await writeFounders(items);

    return NextResponse.json({
      success: true,
      story: items[index],
      message: "Founder story updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update founder story" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a founder story (Admin Only)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("id");

    let id = queryId;
    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // no json body
      }
    }

    if (!id) {
      return NextResponse.json({ success: false, message: "Story ID is required." }, { status: 400 });
    }

    const items = await readFounders();
    const filtered = items.filter((i) => i.id !== id);

    if (filtered.length === items.length) {
      return NextResponse.json({ success: false, message: "Founder story not found." }, { status: 404 });
    }

    await writeFounders(filtered);

    return NextResponse.json({
      success: true,
      message: "Founder story deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete founder story" },
      { status: 500 }
    );
  }
}
