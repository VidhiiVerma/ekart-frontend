"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  productName: string;
  price: number;
  qty: number;
  status: "Pending" | "Shipped" | "Delivered";
};

export default function AdminPage() {
  const [role, setRole] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // LOAD DATA 
  useEffect(() => {
    setRole(localStorage.getItem("role"));

    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  //BLOCK NON-ADMIN 
  if (role !== "admin") {
    return (
      <p className="p-6 text-red-600 font-semibold">
        Access denied
      </p>
    );
  }

  // ADD PRODUCT 
  function addProduct() {
    if (!name || !price) return;

    const newProduct: Product = {
      id: Date.now(),
      name,
      price: Number(price),
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setName("");
    setPrice("");
  }

  //DELETE PRODUCT 
  function deleteProduct(id: number) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  //UPDATE ORDER STATUS 
  function updateOrderStatus(
    id: number,
    status: "Pending" | "Shipped" | "Delivered"
  ) {
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <section className="rounded border p-4">
        <h2 className="mb-3 font-semibold">Add Product</h2>

        <input
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="mb-3 w-full rounded border px-3 py-2"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={addProduct}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Product
        </button>
      </section>

      <section className="rounded border p-4">
        <h2 className="mb-3 font-semibold">Products</h2>

        {products.length === 0 && (
          <p className="text-sm text-gray-500">
            No products added yet
          </p>
        )}

        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <span>
                {p.name} — ₹{p.price}
              </span>

              <button
                onClick={() => deleteProduct(p.id)}
                className="text-red-600"
                title="Delete"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded border p-4">
        <h2 className="mb-3 font-semibold">Orders</h2>

        {orders.length === 0 && (
          <p className="text-sm text-gray-500">
            No orders yet
          </p>
        )}

        <ul className="space-y-3">
          {orders.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between rounded border px-4 py-3"
            >
              <div>
                <p className="font-medium">{o.productName}</p>
                <p className="text-sm text-gray-600">
                  Qty: {o.qty} · Total: ₹{o.price * o.qty}
                </p>
              </div>

              <select
                value={o.status}
                onChange={(e) =>
                  updateOrderStatus(
                    o.id,
                    e.target.value as Order["status"]
                  )
                }
                className="rounded border px-2 py-1 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
