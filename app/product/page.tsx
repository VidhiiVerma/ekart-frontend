"use client";

import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Headphone",
    image: "headphone.avif",
    slug: "electronics",
  },
  {
    id: 2,
    name: "Footwear",
    image: "/shoes.webp",
    slug: "footwear",
  },
  {
    id: 3,
    name: "Accessories",
    image: "/bag.jpg",
    slug: "accessories",
  },
];

export default function ProductPage() {
  const router = useRouter();

  return (
    <main className="px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border p-3 hover:shadow"
          >
            <img
              src={c.image}
              alt={c.name}
              className="h-48 w-full rounded object-contain"
            />

            <h2 className="mt-2 text-sm font-medium">
              {c.name}
            </h2>

            <button
              onClick={() => router.push(`/product/${c.slug}`)}
              className="mt-3 w-full rounded bg-blue-700 py-2 text-sm text-white"
            >
              Browse All
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
