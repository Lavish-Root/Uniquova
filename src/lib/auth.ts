import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const CONFIG_FILE = path.join(process.cwd(), "src", "data", "adminConfig.json");

/**
 * Retrieve the active administrative password securely.
 * Checks environment variable first, then persisted adminConfig.json.
 */
export async function getAdminPassword(): Promise<string> {
  let savedPassword = process.env.ADMIN_PASSWORD;

  try {
    const data = await fs.readFile(CONFIG_FILE, "utf-8");
    const config = JSON.parse(data);
    if (config.password && typeof config.password === "string") {
      savedPassword = config.password;
    }
  } catch {
    // Config file missing or unreadable
  }

  // If no password configured anywhere, return empty string (rejects auth)
  return savedPassword || "";
}

/**
 * Retrieve the active administrative email.
 */
export async function getAdminEmail(): Promise<string> {
  let savedEmail = process.env.ADMIN_EMAIL || "lavishchouhan56@gmail.com";
  try {
    const data = await fs.readFile(CONFIG_FILE, "utf-8");
    const config = JSON.parse(data);
    if (config.adminEmail && typeof config.adminEmail === "string") {
      savedEmail = config.adminEmail;
    }
  } catch {
    // fallback
  }
  return savedEmail;
}

/**
 * Timing-safe string comparison to prevent side-channel timing attacks.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");

  if (bufA.length !== bufB.length) {
    // Perform dummy comparison to equalize timing
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Verifies admin authentication using constant-time evaluation.
 */
export async function verifyAdminAuth(request: Request): Promise<boolean> {
  const adminPassword = request.headers.get("x-admin-password");
  if (!adminPassword) return false;

  const currentPassword = await getAdminPassword();
  if (!currentPassword) return false;

  return timingSafeCompare(adminPassword, currentPassword);
}

// =========================================================================
// SLIDING-WINDOW IN-MEMORY RATE LIMITER
// =========================================================================

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Extracts client IP from common proxy headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

/**
 * Checks if a given identifier exceeds rate limit in a sliding time window.
 * 
 * @param key Identifier (e.g. `contact_${ip}`)
 * @param limit Maximum allowed requests in window
 * @param windowMs Time window in milliseconds (e.g. 60_000 for 1 minute)
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Evict timestamps older than window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.ceil((windowMs - (now - oldest)) / 1000);
    return { allowed: false, remaining: 0, resetSeconds };
  }

  record.timestamps.push(now);
  rateLimitStore.set(key, record);

  // Auto garbage collection if store grows
  if (rateLimitStore.size > 2000) {
    rateLimitStore.forEach((v, k) => {
      v.timestamps = v.timestamps.filter((t: number) => now - t < windowMs);
      if (v.timestamps.length === 0) rateLimitStore.delete(k);
    });
  }

  return {
    allowed: true,
    remaining: limit - record.timestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}
