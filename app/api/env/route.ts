import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    MAIL_FROM: process.env.MAIL_FROM,
    ALL_ENV_KEYS: Object.keys(process.env).filter(
      key =>
        key.includes("SMTP") ||
        key.includes("MAIL") ||
        key.includes("PAYSTACK")
    ),
  });
}