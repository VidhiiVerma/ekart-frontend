
"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type Role = "admin" | "customer" | null;
type Product = { id: string; name: string; price: number; image?: string };
type Order = { id: string; items: { productId: string; qty: number }[]; status: string };

type Store = {
  role: Role;
  products: Product[];
  orders: Order[];
  loginAs: (r: Exclude<Role, null>) => void;
  logout: () => void;
  addProduct: (p: Omit<Product, "id">) => void;
  placeOrder: (items: Order["items"]) => string; // returns orderId
  updateDelivery: (orderId: string, status: "Packed" | "Shipped" | "Delivered") => void;
};

const StoreCtx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);

  // Seed with a few demo products (you can edit/change images)
  const [products, setProducts] = useState<Product[]>([
    { id: "p1", name: "Wireless Headphones", price: 2999, image: "/images/headphone.avif" },
    { id: "p2", name: "Smart Watch",          price: 4999, image: "/images/smartwatch.webp" },
    { id: "p3", name: "Running Shoes",         price: 2599, image: "/images/shoes.webp" },
    { id: "p4", name: "Minimal Backpack",      price: 1499, image: "/images/bag.jpg" },
  ]);

  const [orders, setOrders] = useState<Order[]>([]);

  const value = useMemo<Store>(() => ({
    role,
    products,
    orders,

    loginAs: (r) => setRole(r),
    logout: () => setRole(null),

    addProduct: (p) => setProducts((prev) => [...prev, { id: Date.now().toString(), ...p }]),

    placeOrder: (items) => {
      const id = "ord_" + Date.now();
      setOrders((prev) => [...prev, { id, items, status: "Placed" }]);
      return id;
    },

    updateDelivery: (orderId, status) =>
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o))),
  }), [role, products, orders]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
