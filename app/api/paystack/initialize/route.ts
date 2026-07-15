import { NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

import { dynamoDb } from "@/lib/dynamodb";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Fetch the order from DynamoDB
    const result = await dynamoDb.send(
      new GetCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME!,
        Key: {
          orderId,
        },
      })
    );

    if (!result.Item) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    const order = result.Item;

    const reference = `PAY-${order.orderId}-${Date.now()}`;

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: order.customer.email,

          // Paystack expects cents (ZAR x100)
          amount: Math.round(order.total * 100),

          currency: "ZAR",

          reference,

          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,

          metadata: {
            orderId: order.orderId,

            customerName: `${order.customer.firstName} ${order.customer.lastName}`,

            phone: order.customer.phone,

            deliveryMethod: order.deliveryMethod,
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    });

  } catch (error) {
    console.error("Paystack Initialize Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to initialize payment.",
      },
      {
        status: 500,
      }
    );
  }
}