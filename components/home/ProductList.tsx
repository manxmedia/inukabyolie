"use client";

import products from "@/data/products.json";
import ProductCard from "./ProductCard";
import { useSearch } from "@/context/SearchContext";

export default function ProductList() {
  const { searchQuery } = useSearch();

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category?.some((category: string) =>
        category.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>

          <h3 className="text-xl font-semibold text-foreground mb-2">
            No products found
          </h3>

          <p className="text-muted-foreground">
            No products matched "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
}