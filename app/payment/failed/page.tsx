"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowLeft,
  CreditCard,
  ShoppingCart,
  XCircle,
} from "lucide-react";

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-2xl py-20 px-4">

      <Card>

        <CardContent className="py-12 text-center">

          <XCircle className="mx-auto h-20 w-20 text-red-600" />

          <h1 className="mt-6 text-3xl font-bold">
            Payment Unsuccessful
          </h1>

          <p className="mt-4 text-muted-foreground">
            Unfortunately, we couldn't complete your payment.
          </p>

          <p className="mt-2 text-muted-foreground">
            Your order has been saved and is currently awaiting payment.
            No money has been deducted from your account if the payment failed.
          </p>

          <div className="mt-8 rounded-lg border bg-muted/30 p-6 text-left">

            <h2 className="font-semibold mb-3">
              Possible reasons
            </h2>

            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Payment was cancelled.</li>
              <li>Your bank declined the transaction.</li>
              <li>Insufficient funds.</li>
              <li>Network interruption during payment.</li>
              <li>The payment session expired.</li>
            </ul>

          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">

            <Button
              onClick={() => router.push("/payment")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Try Payment Again
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Return to Cart
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}