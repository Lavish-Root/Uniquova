import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ProjectItem } from "@/data/agencyData";

export const dynamic = "force-dynamic";

const PROJECTS_FILE = path.join(process.cwd(), "src", "data", "projects.json");
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

async function readProjects(): Promise<ProjectItem[]> {
  try {
    const data = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProjects(projects: ProjectItem[]): Promise<void> {
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

// GET: Fetch all projects
export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to load projects" },
      { status: 500 }
    );
  }
}

// POST: Add new project (Admin Only)
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      serviceCategory,
      client,
      description,
      vercelUrl,
      githubUrl,
      mediaType,
      mediaUrl,
      technologies,
      impact,
      metrics,
      featured,
    } = body;

    if (!title || !serviceCategory || !client || !description) {
      return NextResponse.json(
        { success: false, message: "Title, category, client, and description are required." },
        { status: 400 }
      );
    }

    const newProject: ProjectItem = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      serviceCategory: serviceCategory.trim(),
      client: client.trim(),
      description: description.trim(),
      vercelUrl: vercelUrl ? vercelUrl.trim() : "",
      githubUrl: githubUrl ? githubUrl.trim() : "",
      mediaType: mediaType === "video" ? "video" : "image",
      mediaUrl: mediaUrl ? mediaUrl.trim() : "/images/services/web_dev_bg.jpg",
      technologies: Array.isArray(technologies) ? technologies : [],
      impact: impact ? impact.trim() : "Proven Business Growth",
      metrics: Array.isArray(metrics) ? metrics : [],
      featured: Boolean(featured),
      createdAt: new Date().toISOString(),
    };

    const projects = await readProjects();
    // Prepend new project so it appears first
    projects.unshift(newProject);
    await writeProjects(projects);

    return NextResponse.json({
      success: true,
      message: "Project published successfully",
      project: newProject,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to add project" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing project (Admin Only)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required for update." },
        { status: 400 }
      );
    }

    const projects = await readProjects();
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    projects[index] = {
      ...projects[index],
      ...updates,
      id, // Preserve original ID
    };

    await writeProjects(projects);

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: projects[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project (Admin Only)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin credentials required." },
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
        { success: false, message: "Project ID is required for deletion." },
        { status: 400 }
      );
    }

    const projects = await readProjects();
    const filtered = projects.filter((p) => p.id !== id);

    if (filtered.length === projects.length) {
      return NextResponse.json(
        { success: false, message: "Project not found or already deleted." },
        { status: 404 }
      );
    }

    await writeProjects(filtered);

    return NextResponse.json({
      success: true,
      message: "Project removed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete project" },
      { status: 500 }
    );
  }
}
