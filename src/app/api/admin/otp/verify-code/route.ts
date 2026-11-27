import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const OTP_CACHE_FILE = path.join(process.cwd(), "src", "data", ".otp_cache.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawOtp = body.otp || body.code;

    if (!rawOtp || typeof rawOtp !== "string" || rawOtp.trim().length !== 6) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 6-digit verification code." },
        { status: 400 }
      );
    }
    const otp = rawOtp.trim();

    let otpData: {
      otp: string;
      email: string;
      expiresAt: number;
      attempts: number;
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
          message: "No active verification code found. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    if (!otpData) {
      return NextResponse.json(
        { success: false, message: "No active verification code found." },
        { status: 400 }
      );
    }

    // Check expiration
    if (Date.now() > otpData.expiresAt) {
      await fs.unlink(OTP_CACHE_FILE).catch(() => {});
      return NextResponse.json(
        {
          success: false,
          message: "Verification code has expired. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    // Check attempts limit
    otpData.attempts = (otpData.attempts || 0) + 1;
    if (otpData.attempts > 3) {
      await fs.unlink(OTP_CACHE_FILE).catch(() => {});
      return NextResponse.json(
        {
          success: false,
          message: "Too many failed attempts. Code invalidated. Please request a new OTP.",
        },
        { status: 429 }
      );
    }

    // Validate OTP match
    if (otp.trim() !== otpData.otp.trim()) {
      await fs.writeFile(OTP_CACHE_FILE, JSON.stringify(otpData, null, 2), "utf-8");
      const remaining = 3 - otpData.attempts;
      return NextResponse.json(
        {
          success: false,
          message: `Incorrect OTP code. ${remaining > 0 ? `${remaining} attempt(s) remaining.` : "Please request a new code."}`,
        },
        { status: 400 }
      );
    }

    // OTP is valid! Issue temporary reset token valid for 10 minutes
    const resetToken = `rst_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    otpData.resetToken = resetToken;
    otpData.resetExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await fs.writeFile(OTP_CACHE_FILE, JSON.stringify(otpData, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      resetToken,
      message: "OTP verified successfully! You may now set your new password.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server error during verification",
      },
      { status: 500 }
    );
  }
}
