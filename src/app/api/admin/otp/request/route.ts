import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { sendOtpEmail, maskEmail } from "@/lib/email";
import { getAdminEmail, checkRateLimit, getClientIp } from "@/lib/auth";

export const dynamic = "force-dynamic";

const OTP_CACHE_FILE = path.join(process.cwd(), "src", "data", ".otp_cache.json");

export async function POST(request: Request) {
  try {
    // Prevent OTP bombing: max 3 requests per 10 minutes per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`otp_req_${clientIp}`, 3, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many verification requests. Please wait ${rateCheck.resetSeconds} seconds before requesting a new code.`,
        },
        { status: 429 }
      );
    }

    const adminEmail = await getAdminEmail();

    // Generate cryptographically secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();
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

    const isDev = process.env.NODE_ENV !== "production" || !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("your_resend");

    return NextResponse.json({
      success: true,
      email: adminEmail,
      maskedEmail: maskEmail(adminEmail),
      message: `A 6-digit verification code has been sent to ${adminEmail}.`,
      provider: emailResult.provider,
      expiresInSeconds: 300,
      ...(isDev ? { devOtp: otp } : {}),
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
