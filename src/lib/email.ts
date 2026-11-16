export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "admin@***";
  const [user, domain] = email.split("@");
  if (user.length <= 2) {
    return `${user.charAt(0)}*@${domain}`;
  }
  const visible = user.slice(0, 2);
  const masked = "*".repeat(Math.min(user.length - 2, 5));
  return `${visible}${masked}@${domain}`;
}

export interface SendOtpResult {
  success: boolean;
  provider: "resend" | "smtp" | "console";
  message: string;
}

export async function sendOtpEmail({
  toEmail,
  otp,
}: {
  toEmail: string;
  otp: string;
}): Promise<SendOtpResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "UNIQOVA Security <onboarding@resend.dev>";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>UNIQOVA Gateway Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0E0C15; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0E0C15; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="500" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #151323; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                <!-- Header -->
                <tr>
                  <td style="padding: 30px; text-align: center; background: linear-gradient(135deg, rgba(117,69,245,0.15) 0%, rgba(117,69,245,0) 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF;">
                      UNIQ<span style="color: #7545F5;">OVA</span>
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #7545F5; font-weight: 700;">
                      Security Gateway — uniq_up
                    </p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 35px 30px; text-align: center;">
                    <h2 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 700; color: #FFFFFF;">
                      Password Reset Verification
                    </h2>
                    <p style="margin: 0 0 25px 0; font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.65);">
                      Use the one-time passcode below to authorize a password change for your UNIQOVA administrative portal.
                    </p>
                    
                    <!-- OTP Box -->
                    <div style="background-color: #0E0C15; border: 1px solid rgba(117,69,245,0.4); border-radius: 14px; padding: 18px 24px; margin: 0 auto 25px auto; display: inline-block;">
                      <span style="font-family: monospace, 'Courier New', Courier; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #9B6BFF; text-shadow: 0 0 12px rgba(117,69,245,0.5);">
                        ${otp}
                      </span>
                    </div>

                    <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.5;">
                      ⏰ This code will expire in <strong>5 minutes</strong>.<br>
                      If you did not request this verification, please ignore this email.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3);">
                      © 2026 UNIQOVA Digital Agency. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // Always log to console for dev / audit
  console.log("=================================================");
  console.log("🔐 [UNIQOVA CMS GATEWAY OTP GENERATED]");
  console.log(`Recipient Email: ${toEmail}`);
  console.log(`Verification Code (OTP): >>> ${otp} <<<`);
  console.log(`Valid For: 5 minutes (${new Date(Date.now() + 5 * 60 * 1000).toLocaleTimeString()})`);
  console.log("=================================================");

  // 1. Try Resend API if API Key is set
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `Your UNIQOVA Admin Verification Code: ${otp}`,
          html: emailHtml,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          provider: "resend",
          message: `Verification OTP delivered to ${toEmail} via Resend.`,
        };
      }

      const errData = await response.json().catch(() => ({}));
      console.warn("[Resend Delivery Warning]:", errData);
      const resendMsg = errData?.message || "Resend email dispatch error";

      return {
        success: false,
        provider: "resend",
        message: resendMsg,
      };
    } catch (err) {
      console.error("[Resend Network Error]:", err);
      return {
        success: false,
        provider: "resend",
        message: err instanceof Error ? err.message : "Network error reaching Resend API",
      };
    }
  }

  // 2. Console fallback
  return {
    success: true,
    provider: "console",
    message: `OTP generated for ${toEmail}.`,
  };
}
