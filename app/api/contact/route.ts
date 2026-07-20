import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import AdminContactEmail from "@/app/contact/AdminContactEmail";
import CustomerContactEmail from "@/app/contact/CustomerContactEmail";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    } = body;

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

await sendEmail({
  to: email,
  subject: "We've Received Your Message - INUKA by Olie",
  email: React.createElement(CustomerContactEmail, {
    firstName,
  }),
});

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send message.",
      },
      {
        status: 500,
      }
    );
  }
}