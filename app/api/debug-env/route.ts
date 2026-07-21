import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    SMTP_HOST: process.env.SMTP_HOST ?? "undefined",
    SMTP_PORT: process.env.SMTP_PORT ?? "undefined",
    SMTP_USER: process.env.SMTP_USER ?? "undefined",
    MAIL_FROM: process.env.MAIL_FROM ?? "undefined",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD ? "SET" : "NOT SET",
  });
}