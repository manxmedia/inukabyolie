import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import AdminContactEmail from "@/app/contact/AdminContactEmail";
import CustomerContactEmail from "@/app/contact/CustomerContactEmail";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    console.log("📩 Contact form request received");

    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    } = body;

    console.log("📋 Parsed request body");

    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("MAIL_FROM:", process.env.MAIL_FROM);
    console.log(
      "SMTP_PASSWORD:",
      process.env.SMTP_PASSWORD ? "SET" : "NOT SET"
    );

    if (!firstName?.trim()) {
      return NextResponse.json(
        { success: false, message: "First name is required." },
        { status: 400 }
      );
    }

    if (!lastName?.trim()) {
      return NextResponse.json(
        { success: false, message: "Last name is required." },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Message is required." },
        { status: 400 }
      );
    }

    console.log("📤 Sending admin email...");

    await sendEmail({
      to: "info@inukabyolie.co.za",
      subject: `New Contact Form: ${subject || "General Enquiry"}`,
      email: React.createElement(AdminContactEmail, {
        firstName,
        lastName,
        senderEmail: email,
        phone,
        subject,
        message,
      }),
    });

    console.log("✅ Admin email sent");

    console.log("📤 Sending customer email...");

    await sendEmail({
      to: email,
      subject: "We've Received Your Message - INUKA by Olie",
      email: React.createElement(CustomerContactEmail, {
        firstName,
      }),
    });

    console.log("✅ Customer email sent");

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("❌ CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send message.",
      },
      { status: 500 }
    );
  }
}