
import { sendEmail } from "@/lib/mail";

import CustomerOrderEmail from "@/emails/CustomerOrderEmail";

import AdminOrderEmail from "@/emails/AdminOrderEmail";

import { NextRequest, NextResponse } from "next/server";

import {UpdateCommand,GetCommand,} from "@aws-sdk/lib-dynamodb";

import { dynamoDb } from "@/lib/dynamodb";

import React from "react";


export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference is required.",
        },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.status) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Unable to verify payment.",
        },
        {
          status: 400,
        }
      );
    }

    const payment = result.data;

console.log("========== PAYSTACK VERIFY ==========");
console.log("Reference:", payment.reference);
console.log("Status:", payment.status);
console.log("Metadata:", payment.metadata);
console.log("====================================");

    if (payment.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          message: `Payment status is "${payment.status}".`,
        },
        {
          status: 400,
        }
      );
    }

    // Read orderId from Paystack metadata
    const orderId = payment.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID missing from payment metadata.",
        },
        {
          status: 400,
        }
      );
    }

    // Update DynamoDB order
    await dynamoDb.send(
      new UpdateCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME!,
        Key: {
          orderId,
        },
        UpdateExpression: `
          SET
            #status = :status,
            paymentReference = :paymentReference,
            paymentChannel = :paymentChannel,
            paymentTransactionId = :paymentTransactionId,
            paidAt = :paidAt,
            updatedAt = :updatedAt
        `,
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": "PAID",
          ":paymentReference": payment.reference,
          ":paymentChannel": payment.channel,
          ":paymentTransactionId": String(payment.id),
          ":paidAt": payment.paid_at,
          ":updatedAt": new Date().toISOString(),
        },
      })
    );

    // Load the updated order from DynamoDB
const orderResult = await dynamoDb.send(
  new GetCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    Key: {
      orderId,
    },
  })
);

if (!orderResult.Item) {
  throw new Error("Unable to load order after payment verification.");
}

const order = orderResult.Item;

// =========================
// Customer Email
// =========================

try {
  await sendEmail({
    to: order.customer.email,
    subject: `Order Confirmation - ${order.orderId}`,
email: React.createElement(CustomerOrderEmail, {
  order,
}),
  });

  console.log("Customer email sent.");
} catch (error) {
  console.error("Customer email failed:", error);
}

// =========================
// Admin Email
// =========================

try {
  await sendEmail({
    to: "orders@inukabyolie.co.za",
    subject: `New Paid Order - ${order.orderId}`,
    email: React.createElement(AdminOrderEmail, {
      order,
}),
  });

  console.log("Admin email sent.");
} catch (error) {
  console.error("Admin email failed:", error);
}

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",

      payment: {
        orderId,

        reference: payment.reference,

        transactionId: payment.id,

        amount: payment.amount / 100,

        currency: payment.currency,

        channel: payment.channel,

        paidAt: payment.paid_at,

        customer: payment.customer,
      },
    });

  } catch (error) {
    console.error("Paystack Verify Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}