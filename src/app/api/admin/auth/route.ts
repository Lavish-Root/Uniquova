import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminPassword, timingSafeCompare, checkRateLimit, getClientIp } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    
    // Brute-force protection: max 5 login attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`login_${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many failed login attempts. Gateway locked for ${rateCheck.resetSeconds} seconds to prevent brute-force attacks.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const currentPassword = await getAdminPassword();
    const isValid = timingSafeCompare(password, currentPassword);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Incorrect admin password. Access denied." },
        { status: 401 }
      );
    }

    // Generate cryptographically secure session token
    const token = crypto.randomBytes(32).toString("hex");

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
