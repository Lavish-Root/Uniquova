import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const CONFIG_FILE = path.join(process.cwd(), "src", "data", "adminConfig.json");
const OTP_CACHE_FILE = path.join(process.cwd(), "src", "data", ".otp_cache.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { resetToken, newPassword } = body;

    if (!resetToken || typeof resetToken !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid reset authorization token is required." },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.trim().length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Read cached token
    let otpData: {
      otp: string;
      email: string;
      resetToken?: string;
      resetExpiresAt?: number;
    } | null = null;

    try {
      const data = await fs.readFile(OTP_CACHE_FILE, "utf-8");
      otpData = JSON.parse(data);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization expired. Please verify with OTP again.",
        },
        { status: 401 }
      );
    }

    if (!otpData || !otpData.resetToken || otpData.resetToken !== resetToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or unauthorized reset token.",
        },
        { status: 401 }
      );
    }

    if (!otpData.resetExpiresAt || Date.now() > otpData.resetExpiresAt) {
      await fs.unlink(OTP_CACHE_FILE).catch(() => {});
      return NextResponse.json(
        {
          success: false,
          message: "Reset token has expired. Please verify OTP again.",
        },
        { status: 401 }
      );
    }

    // Read current admin config
    let currentConfig: { password?: string; adminEmail?: string; lastUpdated?: string } = {
      adminEmail: "lavishchouhan56@gmail.com",
    };

    try {
      const rawConfig = await fs.readFile(CONFIG_FILE, "utf-8");
      currentConfig = JSON.parse(rawConfig);
    } catch {
      // fallback
    }

    currentConfig.password = newPassword.trim();
    if (!currentConfig.adminEmail) {
      currentConfig.adminEmail = "lavishchouhan56@gmail.com";
    }
    currentConfig.lastUpdated = new Date().toISOString();

    await fs.writeFile(CONFIG_FILE, JSON.stringify(currentConfig, null, 2), "utf-8");

    // Clear OTP cache
    await fs.unlink(OTP_CACHE_FILE).catch(() => {});

    // Session token
    const token = Buffer.from(`uniq_session_${Date.now()}_${Math.random()}`).toString("base64");

    return NextResponse.json({
      success: true,
      message: "Admin password updated successfully!",
      token,
      newPassword: newPassword.trim(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server error updating password",
      },
      { status: 500 }
    );
  }
}
