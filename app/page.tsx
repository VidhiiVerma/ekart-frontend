"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  { id: 1, name: "Wireless Headphones", price: 2999, image: "headphone.avif" },
  { id: 2, name: "Smart Watch", price: 4999, image: "smartwatch.webp" },
  { id: 3, name: "Running Shoes", price: 2599, image: "shoes.webp" },
  { id: 4, name: "Minimal Backpack", price: 1499, image: "bag.jpg" },
  { id: 5, name: "Home Decor", price: 1499, image: "home_decor.jpg" },
];

const inr = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(v);

export default function HomePage() {
  const [role, setRole] = useState<"admin" | "customer" | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<typeof products[0] | null>(null);
  const [qty, setQty] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const r = localStorage.getItem("role") as "admin" | "customer" | null;
    setRole(r);
  }, []);

  // ADD TO CART
  function addToCart() {
    if (!selectedProduct) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find(
      (item: any) => item.id === selectedProduct.id
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setSelectedProduct(null);
    setQty(1);
    router.push("/checkout");
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="w-screen bg-blue-800 py-2 text-center text-xs font-medium text-white">
        Free shipping over ₹999 · 7-day returns
      </div>

      {role === "admin" && (
        <div className="w-full bg-yellow-100 border-b border-yellow-300 px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-medium text-yellow-900">
            You are logged in as <b>Admin</b>
          </span>

          <button
            onClick={() => router.push("/admin")}
            className="rounded bg-yellow-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-yellow-700"
          >
            Go to Admin Dashboard
          </button>
        </div>
      )}

      <section className="border-b border-gray-200">
        <div className="w-full px-4 py-8 md:py-10">
          <h1 className="text-3xl font-bold text-blue-900 md:text-4xl">
            Shop the latest. Simple prices. Fast delivery.
          </h1>
          <p className="mt-3 text-gray-600">
            Curated products across fashion, electronics, and home essentials.
          </p>
        </div>
      </section>

      <section className="w-screen">
        <div className="w-full px-4 py-8">
          <h2 className="mb-4 text-xl font-semibold text-blue-900">
            Featured products
          </h2>

          <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-blue-100 p-3 hover:shadow-sm"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-blue-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-3 text-sm font-medium text-blue-900">
                  {p.name}
                </h3>
                <p className="text-sm text-blue-700">
                  {inr(p.price)}
                </p>

                {role === "customer" && (
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="mt-2 w-full rounded bg-blue-700 py-1.5 text-sm text-white"
                  >
                    Order
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded bg-white p-6">
            <h3 className="mb-4 font-semibold text-blue-900">
              {selectedProduct.name}
            </h3>

            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="rounded border px-3 py-1"
              >
                -
              </button>

              <span className="font-medium">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="rounded border px-3 py-1"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              className="w-full rounded bg-green-600 py-2 text-white"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-2 w-full text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
