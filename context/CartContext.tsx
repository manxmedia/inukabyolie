"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type DeliveryMethod = "delivery" | "pickup";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;

  // NEW
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: React.Dispatch<React.SetStateAction<DeliveryMethod>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedMethod = localStorage.getItem("deliveryMethod");
    if (savedMethod === "delivery" || savedMethod === "pickup") {
      setDeliveryMethod(savedMethod);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("deliveryMethod", deliveryMethod);
  }, [deliveryMethod]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("deliveryMethod");
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, quantity) }
          : p
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        deliveryMethod,
        setDeliveryMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
