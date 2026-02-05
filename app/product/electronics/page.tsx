"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image_url: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "JBL Live 770NC Wireless Over-Ear Headphones",
    description: "Noise cancelling over-ear headphones with JBL signature sound",
    price: 9999,
    stock: 20,
    category_id: 1,
    image_url: "/jbl.webp",
  },
  {
    id: 2,
    name: "Bose QuietComfort Ultra Wireless Headphones",
    description: "Premium comfort with world-class noise cancellation",
    price: 25999,
    stock: 10,
    category_id: 1,
    image_url: "/buse.avif",
  },
  {
    id: 3,
    name: "boAt Rockid Rush Wireless Headphones",
    description: "Affordable wireless headphones with deep bass",
    price: 4999,
    stock: 0,
    category_id: 1,
    image_url: "/boat.jpg",
  },
];

export default function ElectronicsPage() {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [qty, setQty] = useState(1);

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
    <main className="px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Wireless Headphones
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="rounded border p-3 hover:shadow"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="h-40 w-full rounded object-contain"
            />

            <h2 className="mt-2 text-sm font-medium">
              {p.name}
            </h2>

            <p className="text-xs text-gray-500">
              {p.description}
            </p>

            <p className="mt-1 text-sm text-gray-700">
              ₹{p.price}
            </p>

            <button
              disabled={p.stock === 0}
              onClick={() => setSelectedProduct(p)}
              className={`mt-3 w-full rounded py-2 text-sm text-white ${
                p.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700"
              }`}
            >
              {p.stock === 0 ? "Out of Stock" : "Order"}
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded bg-white p-6">
            <h3 className="mb-2 font-semibold">
              {selectedProduct.name}
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              {selectedProduct.description}
            </p>

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
