"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Store,
  Truck,
} from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Address {
  street: string;
  apartment?: string;
  suburb?: string;
  city: string;
  province: string;
  postalCode: string;
}

interface Order {
  orderId: string;
  status: string;
  customer: Customer;
  deliveryMethod: "delivery" | "pickup";
  address: Address | null;
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function PaymentPage() {
  const router = useRouter();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const storedOrderId = sessionStorage.getItem("orderId");

    if (!storedOrderId) {
      router.replace("/checkout");
      return;
    }

    setOrderId(storedOrderId);

    loadOrder(storedOrderId);
  }, [router]);

  async function loadOrder(id: string) {
    try {
      const response = await fetch(`/api/orders/${id}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOrder(data.order);
    } catch (error) {
      console.error(error);
      alert("Unable to load your order.");
      router.replace("/checkout");
    } finally {
      setPageLoading(false);
    }
  }

  async function handlePay() {
    if (!orderId) return;

    setPaymentLoading(true);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      window.location.href = data.authorization_url;
    } catch (error) {
      console.error(error);

      alert("Unable to connect to Paystack.");

      setPaymentLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="container mx-auto py-24 flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">

      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-2">
        Payment
      </h1>

      <p className="text-muted-foreground mb-8">
        Order #{order.orderId}
      </p>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

          <Card>

            <CardHeader>

              <CardTitle>
                Customer Details
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-2">

              <p>
                <strong>Name:</strong>{" "}
                {order.customer.firstName} {order.customer.lastName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.customer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customer.phone}
              </p>

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                Delivery Method
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex gap-3">

                {order.deliveryMethod === "delivery" ? (
                  <Truck className="h-5 w-5 text-primary mt-1" />
                ) : (
                  <Store className="h-5 w-5 text-primary mt-1" />
                )}

                <div>

                  <p className="font-semibold">

                    {order.deliveryMethod === "delivery"
                      ? "Delivery"
                      : "Self Pickup"}

                  </p>

                  {order.deliveryMethod === "delivery" &&
                    order.address && (
                      <div className="mt-2 text-sm text-muted-foreground">

                        <p>{order.address.street}</p>

                        {order.address.apartment && (
                          <p>{order.address.apartment}</p>
                        )}

                        {order.address.suburb && (
                          <p>{order.address.suburb}</p>
                        )}

                        <p>
                          {order.address.city},{" "}
                          {order.address.province}
                        </p>

                        <p>{order.address.postalCode}</p>

                      </div>
                    )}

                </div>

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                Items Ordered
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {order.cart.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >

                  <div>

                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Qty {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    R{(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>

              ))}

            </CardContent>

          </Card>

        </div>

        <div>

          <Card className="sticky top-4">

            <CardHeader>

              <CardTitle>
                Order Summary
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex justify-between">

                <span>Subtotal</span>

                <span>
                  R{order.subtotal.toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Shipping</span>

                <span>

                  {order.shipping === 0 ? (
                    <Badge>
                      Free
                    </Badge>
                  ) : (
                    `R${order.shipping.toFixed(2)}`
                  )}

                </span>

              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">

                <span>Total</span>

                <span className="text-primary">
                  R{order.total.toFixed(2)}
                </span>

              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={paymentLoading}
                onClick={handlePay}
              >

                {paymentLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to Paystack...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay R{order.total.toFixed(2)}
                  </>
                )}

              </Button>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}