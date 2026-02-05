"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin() {
    const role = localStorage.getItem("role");

    if (!role) {
      alert("No role found. Please sign up first.");
      return;
    }

    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-bold">Login</h1>

        <input className="mb-3 w-full border px-3 py-2" placeholder="Email" />
        <input
          className="mb-4 w-full border px-3 py-2"
          type="password"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          Login
        </button>
      </div>
    </main>
  );
}
