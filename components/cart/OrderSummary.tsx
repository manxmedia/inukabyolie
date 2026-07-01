import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { CreditCard, Heart, Shield, Store, Truck } from "lucide-react";
import Link from "next/link";

export default function OrderSummary() {

  // UPDATED: delivery method now comes from CartContext
  const {
    cart,
    deliveryMethod,
    setDeliveryMethod,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const FREE_SHIPPING_THRESHOLD = 5000;
  const SHIPPING_FEE = 150;

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

  return (
    <Card className="sticky top-4">

      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Delivery Method */}

        <div className="space-y-3">

          <h3 className="font-medium">
            Delivery Method
          </h3>

          <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer">

            <div className="flex items-start gap-3">

              <Truck className="h-4 w-4 text-accent-foreground mt-1" />

              <div>
                <span className="font-medium">
                  Delivery
                </span>

                <p className="text-sm text-muted-foreground">
                  R150 (Free over R5000)
                </p>

              </div>

            </div>

            <input
              type="radio"
              checked={deliveryMethod === "delivery"}
              onChange={() => setDeliveryMethod("delivery")}
            />

          </label>

          <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer">

            <div className="flex items-start gap-3">

              <Store className="h-4 w-4 text-accent-foreground mt-1" />

              <div>

                <span className="font-medium">
                  Self Pickup
                </span>

                <p className="text-sm text-muted-foreground">
                  Collect from our store
                </p>

              </div>

            </div>

            <input
              type="radio"
              checked={deliveryMethod === "pickup"}
              onChange={() => setDeliveryMethod("pickup")}
            />

          </label>

        </div>

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

        {shipping > 0 && (

          <div className="p-3 bg-accent/10 rounded-lg">

            <p className="text-xs text-muted-foreground">

              Add R{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}
              more to qualify for FREE delivery.

            </p>

          </div>

        )}

        <Button
          asChild
          size="lg"
          className="w-full"
        >

          <Link href="/checkout">

            <CreditCard className="mr-2 h-4 w-4" />

            Proceed to Checkout

          </Link>

        </Button>

        <div className="space-y-3 pt-4 border-t">

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            Secure SSL checkout
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-blue-500" />
            Free returns within 3 days
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-red-500" />
            24/7 customer support
          </div>

        </div>

      </CardContent>

    </Card>
  );

}
