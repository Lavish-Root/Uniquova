import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { sendOtpEmail, maskEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const CONFIG_FILE = path.join(process.cwd(), "src", "data", "adminConfig.json");
const OTP_CACHE_FILE = path.join(process.cwd(), "src", "data", ".otp_cache.json");

export async function POST() {
  try {
    let adminEmail = process.env.ADMIN_EMAIL || "lavishchouhan56@gmail.com";

    try {
      const data = await fs.readFile(CONFIG_FILE, "utf-8");
      const config = JSON.parse(data);
      if (config.adminEmail) {
        adminEmail = config.adminEmail;
      }
    } catch {
      // Use fallback
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    const otpData = {
      otp,
      email: adminEmail,
      expiresAt,
      attempts: 0,
      createdAt: new Date().toISOString(),
    };

    // Save to temp cache file
    await fs.writeFile(OTP_CACHE_FILE, JSON.stringify(otpData, null, 2), "utf-8");

    // Dispatch email
    const emailResult = await sendOtpEmail({
      toEmail: adminEmail,
      otp,
    });

    return NextResponse.json({
      success: true,
      email: adminEmail,
      maskedEmail: maskEmail(adminEmail),
      message: `A 6-digit verification code has been sent to ${adminEmail}.`,
      provider: emailResult.provider,
      expiresInSeconds: 300,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to generate OTP",
      },
      { status: 500 }
    );
  }
}
