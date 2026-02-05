const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${API_URL}/products`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
