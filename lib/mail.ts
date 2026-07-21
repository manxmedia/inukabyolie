import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";

console.log("==================================");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_SECURE:", process.env.SMTP_SECURE);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("MAIL_FROM:", process.env.MAIL_FROM);
console.log(
  "SMTP_PASSWORD:",
  process.env.SMTP_PASSWORD ? "SET" : "NOT SET"
);
console.log("==================================");

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
});

export async function sendEmail({
  to,
  subject,
  email,
}: {
  to: string;
  subject: string;
  email: React.ReactElement;
}) {
  console.log(`📨 Sending email to ${to}`);

  const html = await render(email);

  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
}

export async function verifyMailConnection() {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection established.");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return false;
  }
}