import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "./db/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: false },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // Resend is constructed per-send so the module can be imported at
        // build time without RESEND_API_KEY.
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = process.env.RESEND_FROM ?? "Mise <noreply@resend.dev>";
        await resend.emails.send({
          from,
          to: email,
          subject: "Sign in to Mise",
          html: signInEmailHtml(url),
        });
      },
    }),
  ],
});

function signInEmailHtml(url: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px;background:#fcf7ef;font-family:ui-sans-serif,system-ui,sans-serif;color:#0c0c0c;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:480px;background:#fff;border:1px solid rgba(12,12,12,0.08);border-radius:18px;padding:32px;">
      <tr><td>
        <div style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#a27b5c;">Mise</div>
        <h1 style="margin:14px 0 8px;font-size:24px;font-weight:500;letter-spacing:-0.02em;">Sign in to your dashboard</h1>
        <p style="margin:0 0 24px;color:#525252;line-height:1.55;">Click the button below to sign in. The link expires in 5 minutes.</p>
        <a href="${url}" style="display:inline-block;background:#0c0c0c;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:500;">Sign in to Mise</a>
        <p style="margin:32px 0 0;font-size:12px;color:#737373;line-height:1.6;">If you didn't request this, you can safely ignore this email.</p>
      </td></tr>
    </table>
  </body>
</html>`;
}
