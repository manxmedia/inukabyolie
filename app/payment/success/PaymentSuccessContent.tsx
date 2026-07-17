"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  CheckCircle2,
  Loader2,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

interface PaymentDetails {
  orderId: string;
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  paidAt: string;
}

export default function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      router.replace("/payment");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/paystack/verify?reference=${reference}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Payment verification failed.");
        }

        setPayment(data.payment);

        clearCart();

        if (typeof window !== "undefined") {
          sessionStorage.removeItem("paymentData");
          sessionStorage.removeItem("orderId");
        }

        setVerified(true);
      } catch (error) {
        console.error("Payment verification error:", error);
        router.replace("/payment");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, router, clearCart]);

  if (loading) {
    return (
      <div className="container mx-auto py-24 flex justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-6 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!verified || !payment) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl py-20 px-4">
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-600" />

          <h1 className="mt-6 text-3xl font-bold">
            Payment Successful
          </h1>

          <p className="mt-4 text-muted-foreground">
            Thank you for shopping with
            <strong> INUKA by Olie</strong>.
          </p>

          <div className="mt-8 space-y-3 rounded-lg border p-6 text-left">
            <div className="flex justify-between">
              <span className="font-medium">Order ID</span>
              <span>{payment.orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Reference</span>
              <span>{payment.reference}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Amount Paid</span>
              <span>
                {payment.currency} {payment.amount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Payment Method</span>
              <span className="capitalize">{payment.channel}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Paid On</span>
              <span>{new Date(payment.paidAt).toLocaleString()}</span>
            </div>
          </div>

          <Button
            className="mt-8 w-full"
            onClick={() => router.push("/")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}