
"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  //  Update cart
  function updateCart(updatedCart: CartItem[]) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Increase quantity
  function increaseQty(id: number) {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  }

  // Decrease quantity
  function decreaseQty(id: number) {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    updateCart(updated);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="mb-6 text-2xl font-bold text-blue-700">
        Checkout
      </h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Your cart is empty</p>
      )}

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded border bg-white p-4"
          >
            <div>
              <p className="font-medium">{item.name}</p>

              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="rounded border px-2 py-1"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="rounded border px-2 py-1"
                >
                  +
                </button>
              </div>
            </div>

            <p className="font-medium">
              ₹{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 rounded border bg-white p-4">
          <p className="text-lg font-semibold">
            Total: ₹{total}
          </p>

          <button
            onClick={() => {
              alert("Order placed successfully");
              localStorage.removeItem("cart");
              setCart([]);
            }}
            className="mt-4 w-full rounded bg-blue-600 py-2 text-white"
          >
            Place Order
          </button>
        </div>
      )}
    </main>
  );
}
