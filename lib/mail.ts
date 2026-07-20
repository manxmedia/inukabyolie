import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
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
  const html = await render(email);

  await transporter.sendMail({
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