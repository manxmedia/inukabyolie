import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";

function getTransporter() {
  console.log("========== SMTP CONFIG ==========");
  console.log({
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD
      ? "********"
      : undefined,
    MAIL_FROM: process.env.MAIL_FROM,
  });
  console.log("=================================");

  return nodemailer.createTransport({
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
}

export async function sendEmail({
  to,
  subject,
  email,
}: {
  to: string;
  subject: string;
  email: React.ReactElement;
}) {
  try {
    const transporter = getTransporter();

    const html = await render(email);

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.error("❌ sendEmail() failed");
    console.error(error);
    throw error;
  }
}

export async function verifyMailConnection() {
  try {
    const transporter = getTransporter();

    await transporter.verify();

    console.log("✅ SMTP connection established.");

    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed");
    console.error(error);

    return false;
  }
}