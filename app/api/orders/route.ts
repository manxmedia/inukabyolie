import { NextRequest, NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import { dynamoDb } from "@/lib/dynamodb";
import { generateOrderId, getCurrentTimestamp } from "@/lib/order";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customer,
      deliveryMethod,
      address,
      cart,
      subtotal,
      shipping,
      total,
    } = body;

    // -----------------------------
    // Basic Validation
    // -----------------------------

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer information is required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const timestamp = getCurrentTimestamp();

    const order = {
      orderId,

      status: "PENDING_PAYMENT",

      customer,

      deliveryMethod,

      address:
        deliveryMethod === "delivery"
          ? address
          : null,

      cart,

      subtotal,

      shipping,

      total,

      paymentReference: null,
      paymentChannel: null,
      paymentTransactionId: null,
      paidAt: null,

      createdAt: timestamp,
      updatedAt: timestamp,
    };
    //logs to console for debugging
    console.log("Saving to table:", process.env.DYNAMODB_TABLE_NAME);
    console.log(order);
    console.log("===== CREATE ORDER =====");
    console.log("Table:", process.env.DYNAMODB_TABLE_NAME);
    console.log("Order ID:", orderId);
    console.log("Customer:", customer);
    console.log("Cart Items:", cart.length);
    //end of logs
    
    await dynamoDb.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME!,
        Item: order,
      })
    );

    return NextResponse.json({
      success: true,
      orderId,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order.",
      },
      {
        status: 500,
      }
    );
  }
}