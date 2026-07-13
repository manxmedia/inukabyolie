"use client";

import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function SalePage() {
  const { addToCart } = useCart();

  const saleProducts = products.filter((product) => product.sale);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold">Sale Items</h1>
            <p className="text-gray-600 mt-2">
              Shop our products currently on sale.
            </p>
          </div>

          <Button
            variant="ghost"
            asChild
            className="self-start md:self-auto text-muted-foreground hover:text-foreground"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
             All Products
            </Link>
          </Button>

        </div>
      </div>

      {saleProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No Items On Sale At The Moment
          </h2>

          <p className="text-gray-500 mt-3">
            Please check back soon for exciting offers.
          </p>

          <Link
            href="/"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
             Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saleProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-72">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <span className="inline-block mb-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  SALE
                </span>

                <h2 className="font-semibold text-lg">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {product.description}
                </p>

                <p className="text-xl font-bold mt-4">
                  R {product.price}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      quantity: 1,
                    })
                  }
                  className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}