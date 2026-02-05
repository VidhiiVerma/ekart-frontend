"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

const inr = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(v);

export default function HomePage() {

  const router = useRouter();
 console.log("HOME PAGE RENDERED");
  // ✅ PRODUCTS FROM BACKEND
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ ROLE
  const [role, setRole] = useState<"admin" | "customer" | null>(null);

  // ✅ ORDER STATE
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  // ✅ FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        console.log("BACKEND PRODUCTS:", data);
        setProducts(data);
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // ✅ GET ROLE
  useEffect(() => {
    const r = localStorage.getItem("role") as "admin" | "customer" | null;
    setRole(r);
  }, []);

  // ✅ ADD TO CART
  function addToCart() {
    if (!selectedProduct) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === selectedProduct.id);

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
      {/* TOP BAR */}
      <div className="w-screen bg-blue-800 py-2 text-center text-xs font-medium text-white">
        Free shipping over ₹999 · 7-day returns
      </div>

      {/* ADMIN BANNER */}
      {role === "admin" && (
        <div className="w-full bg-yellow-100 border-b border-yellow-300 px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-medium text-yellow-900">
            You are logged in as <b>Admin</b>
          </span>

          <button
            onClick={() => router.push("/admin")}
            className="rounded bg-yellow-600 px-4 py-1.5 text-sm font-semibold text-white"
          >
            Go to Admin Dashboard
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="border-b border-gray-200">
        <div className="px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-900">
            Shop the latest. Simple prices. Fast delivery.
          </h1>
          <p className="mt-3 text-gray-600">
            Curated products across fashion, electronics, and home essentials.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold text-blue-900">
          Featured products
        </h2>

        {loading && <p>Loading products...</p>}

        {!loading && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-blue-100 p-3"
              >
                <div className="aspect-square rounded-md bg-blue-50" />

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
        )}
      </section>

      {/* ORDER MODAL */}
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

              <span>{qty}</span>

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
