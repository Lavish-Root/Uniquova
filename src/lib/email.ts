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

  // Log audit notification (sanitized, no plaintext OTP leak)
  if (process.env.NODE_ENV !== "production") {
    console.log(`[UNIQOVA Security Gateway] Verification code dispatched for ${maskEmail(toEmail)}`);
  }

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

export async function sendLeadNotificationEmail({
  toEmail,
  lead,
}: {
  toEmail: string;
  lead: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service: string;
    description: string;
    source?: string;
  };
}): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "UNIQOVA Security <onboarding@resend.dev>";
  if (!resendApiKey) return;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #0E0C15; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px;">
        <div style="max-width: 550px; margin: 0 auto; background: #151323; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px;">
          <h2 style="color: #7545F5; margin-top: 0; font-size: 20px;">🚀 New Project Inquiry Received!</h2>
          <p style="font-size: 13px; color: #a1a1aa; margin-top: 4px;">Reference ID: <strong>${lead.id}</strong></p>
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;" />
          <p style="font-size: 14px; margin: 8px 0;"><strong>Client:</strong> ${lead.name} (${lead.company || "Direct Client"})</p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}" style="color: #9E76FB;">${lead.email}</a></p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${lead.phone}" style="color: #9E76FB;">${lead.phone || "Not provided"}</a></p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Service:</strong> <span style="background: rgba(117,69,245,0.2); color: #9E76FB; padding: 3px 8px; border-radius: 6px; font-weight: bold;">${lead.service}</span></p>
          <div style="background: rgba(255,255,255,0.05); padding: 14px; border-radius: 8px; margin-top: 14px;">
            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #e4e4e7;">${lead.description}</p>
          </div>
          <div style="margin-top: 22px; text-align: center;">
            <a href="https://uniquova.com/uniq_up" style="display: inline-block; background: #7545F5; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 12px 24px; border-radius: 8px;">View in UNIQOVA CMS →</a>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `[New Inquiry] ${lead.name} — ${lead.service} (${lead.id})`,
        html: emailHtml,
      }),
    });
  } catch (err) {
    console.error("[Lead Notification Dispatch Error]:", err);
  }
}
