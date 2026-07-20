"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  CreditCard,
  Store,
  Truck,
} from "lucide-react";

export default function CheckoutPage() {

  const router = useRouter();

  const {
    cart,
    deliveryMethod,
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 5000;
  const SHIPPING_FEE = 150;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping =
    deliveryMethod === "pickup"
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;

  const total = subtotal + shipping;

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    apartment: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

const handleProceedToPayment = async () => {
  if (!formData.firstName.trim())
    return alert("Enter First Name");

  if (!formData.lastName.trim())
    return alert("Enter Last Name");

  if (!formData.email.trim())
    return alert("Enter Email Address");

  if (!formData.phone.trim())
    return alert("Enter Phone Number");

  if (deliveryMethod === "delivery") {
    if (!formData.street.trim())
      return alert("Enter Street Address");

    if (!formData.city.trim())
      return alert("Enter City");

    if (!formData.province.trim())
      return alert("Enter Province");

    if (!formData.postalCode.trim())
      return alert("Enter Postal Code");
  }

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },

        deliveryMethod,

        address:
          deliveryMethod === "delivery"
            ? {
                street: formData.street,
                apartment: formData.apartment,
                suburb: formData.suburb,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
              }
            : null,

        cart,
        subtotal,
        shipping,
        total,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    sessionStorage.setItem("orderId", data.orderId);

    router.push("/payment");
  } catch (error) {
    console.error(error);
    alert("Unable to create order.");
  }
};

  return (

<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

<div className="flex items-center justify-between mb-8">

<div>

<h1 className="text-3xl font-bold">
Checkout
</h1>

<p className="text-muted-foreground mt-2">
Complete your order details
</p>

</div>

<Button variant="ghost" asChild>

<Link href="/cart">

<ArrowLeft className="mr-2 h-4 w-4"/>

Back to Cart

</Link>

</Button>

</div>

<div className="grid lg:grid-cols-3 gap-8">


        {/* LEFT COLUMN */}

        <div className="lg:col-span-2 space-y-6">

          {/* Customer Information */}

          <Card>

            <CardHeader>
              <CardTitle>
                Customer Information
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="grid md:grid-cols-2 gap-4">

                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleChange("firstName", e.target.value)
                  }
                />

                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleChange("lastName", e.target.value)
                  }
                />

                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />

                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                />

              </div>

            </CardContent>

          </Card>

          {/* Delivery Address */}

          {deliveryMethod === "delivery" && (

            <Card>

              <CardHeader>

                <CardTitle>
                  Delivery Address
                </CardTitle>

              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  <Input
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={(e) =>
                      handleChange("street", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Apartment / Unit (Optional)"
                    value={formData.apartment}
                    onChange={(e) =>
                      handleChange("apartment", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Suburb"
                    value={formData.suburb}
                    onChange={(e) =>
                      handleChange("suburb", e.target.value)
                    }
                  />

                  <div className="grid md:grid-cols-2 gap-4">

                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        handleChange("city", e.target.value)
                      }
                    />

                    <Input
                      placeholder="Province"
                      value={formData.province}
                      onChange={(e) =>
                        handleChange("province", e.target.value)
                      }
                    />

                  </div>

                  <Input
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleChange("postalCode", e.target.value)
                    }
                  />

                </div>

              </CardContent>

            </Card>

          )}

          {/* Pickup Notice */}

          {deliveryMethod === "pickup" && (

            <Card>

              <CardHeader>

                <CardTitle>
                  Self Pickup
                </CardTitle>

              </CardHeader>

              <CardContent>

                <p className="text-muted-foreground">

                  You selected <strong>Self Pickup</strong>.

                  <br /><br />

                  Once payment has been confirmed,
                  we'll notify you when your order
                  is ready for collection.

                </p>

              </CardContent>

            </Card>

          )}

        </div>


        {/* RIGHT COLUMN */}

        <div className="lg:col-span-1">

          <Card className="sticky top-4">

            <CardHeader>
              <CardTitle>
                Order Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Delivery Method */}

              <div>

                <h3 className="font-medium mb-3">
                  Delivery Method
                </h3>

                <div className="border rounded-lg p-4 flex items-start gap-3">

                  {deliveryMethod === "delivery" ? (
                    <Truck className="h-5 w-5 mt-1 text-primary" />
                  ) : (
                    <Store className="h-5 w-5 mt-1 text-primary" />
                  )}

                  <div>

                    <p className="font-medium">

                      {deliveryMethod === "delivery"
                        ? "Delivery"
                        : "Self Pickup"}

                    </p>

                    <p className="text-sm text-muted-foreground">

                      {deliveryMethod === "delivery"
                        ? "Your order will be delivered to the address provided."
                        : "Collect your order from our store once notified."}

                    </p>

                  </div>

                </div>

              </div>

              <Separator />

              {/* Totals */}

              <div className="space-y-3">

                <div className="flex justify-between text-sm">

                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} items)
                  </span>

                  <span className="font-medium">
                    R{subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span className="font-medium">

                    {shipping === 0 ? (
                      <Badge variant="secondary">
                        Free
                      </Badge>
                    ) : (
                      `R${shipping.toFixed(2)}`
                    )}

                  </span>

                </div>

                <Separator />

                <div className="flex justify-between">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-lg font-bold text-primary">
                    R{total.toFixed(2)}
                  </span>

                </div>

              </div>


              <Button
                className="w-full"
                size="lg"
                onClick={handleProceedToPayment}
              >

                <CreditCard className="mr-2 h-4 w-4" />

                Proceed to Payment

              </Button>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>

  );

}
