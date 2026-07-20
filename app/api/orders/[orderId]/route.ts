import { NextRequest, NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

import { dynamoDb } from "@/lib/dynamodb";

interface RouteContext {
  params: Promise<{
    orderId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        { status: 400 }
      );
    }

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
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: result.Item,
    });

  } catch (error) {
    console.error("Get Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve order.",
      },
      {
        status: 500,
      }
    );
  }
}