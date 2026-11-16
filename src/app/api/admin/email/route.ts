import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { maskEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const CONFIG_FILE = path.join(process.cwd(), "src", "data", "adminConfig.json");

export async function GET(request: Request) {
  try {
    let email = process.env.ADMIN_EMAIL || "lavishchouhan56@gmail.com";
    let savedPassword = process.env.ADMIN_PASSWORD || "UNIQOVA_ADMIN_2026";

    try {
      const data = await fs.readFile(CONFIG_FILE, "utf-8");
      const config = JSON.parse(data);
      if (config.adminEmail) email = config.adminEmail;
      if (config.password) savedPassword = config.password;
    } catch {
      // fallback
    }

    const authHeader = request.headers.get("x-admin-password");
    const isAuthed = authHeader === savedPassword;

    return NextResponse.json({
      success: true,
      maskedEmail: maskEmail(email),
      email: isAuthed ? email : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to load admin email",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, newEmail } = body;

    if (!password || !newEmail) {
      return NextResponse.json(
        { success: false, message: "Both admin password and new email are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    let currentConfig: { password?: string; adminEmail?: string; lastUpdated?: string } = {};
    try {
      const data = await fs.readFile(CONFIG_FILE, "utf-8");
      currentConfig = JSON.parse(data);
    } catch {
      // fallback
    }

    const savedPassword = currentConfig.password || process.env.ADMIN_PASSWORD || "UNIQOVA_ADMIN_2026";

    if (password !== savedPassword) {
      return NextResponse.json(
        { success: false, message: "Incorrect password. Authorization failed." },
        { status: 401 }
      );
    }

    currentConfig.adminEmail = newEmail.trim();
    currentConfig.lastUpdated = new Date().toISOString();

    await fs.writeFile(CONFIG_FILE, JSON.stringify(currentConfig, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: `Admin recovery email updated to ${newEmail.trim()}.`,
      maskedEmail: maskEmail(newEmail.trim()),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update email",
      },
      { status: 500 }
    );
  }
}
