"use client";

import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-24 flex justify-center">
          <p>Verifying your payment...</p>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}