import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO = "maquidatochristopher@gmail.com";
const FROM = "Mise Contact <onboarding@resend.dev>";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  locations?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const businessType = body.businessType?.trim() ?? "";
  const locations = body.locations?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName) {
    return NextResponse.json(
      { ok: false, error: "First name is required." },
      { status: 400 },
    );
  }
  if (!lastName) {
    return NextResponse.json(
      { ok: false, error: "Last name is required." },
      { status: 400 },
    );
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 400 },
    );
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `New Mise contact: ${fullName} · ${businessType || "Unknown"}`;

  const text = [
    "New contact form submission from mise.app",
    "",
    `Name:           ${fullName}`,
    `Email:          ${email}`,
    `Phone:          ${phone || "—"}`,
    `Business Type:  ${businessType || "—"}`,
    `Locations:      ${locations || "—"}`,
    "",
    "Message:",
    message || "(no message)",
  ].join("\n");

  if (!resend) {
    console.log("[contact] RESEND_API_KEY not set — dev mode payload:");
    console.log(text);
    return NextResponse.json({
      ok: true,
      note: "dev mode: email not sent",
    });
  }

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Could not send email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send email. Please try again later." },
      { status: 500 },
    );
  }
}
