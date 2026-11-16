import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const configPath = path.join(process.cwd(), "src", "data", "adminConfig.json");
    let currentPassword = process.env.ADMIN_PASSWORD || "UNIQOVA_ADMIN_2026";

    try {
      const data = await fs.readFile(configPath, "utf-8");
      const config = JSON.parse(data);
      if (config.password) {
        currentPassword = config.password;
      }
    } catch {
      // Use fallback
    }

    if (password !== currentPassword) {
      return NextResponse.json(
        { success: false, message: "Incorrect admin password. Access denied." },
        { status: 401 }
      );
    }

    // Generate authenticated session token
    const token = Buffer.from(`uniq_session_${Date.now()}_${Math.random()}`).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      message: "Gateway authentication successful",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
