
"use client";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "customer">("customer");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    localStorage.setItem("role", role);

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-semibold text-blue-600">
          Sign up
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full rounded border px-3 py-2" placeholder="Name" required />

          <input className="w-full rounded border px-3 py-2" type="email" placeholder="Email" required />

          <input className="w-full rounded border px-3 py-2" type="password" placeholder="Password" required />

          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="w-full rounded bg-gradient-to-r from-blue-500 to-purple-500 py-2 text-white">
            Create account
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          Already have an account? <Link href="/login" className="font-bold">Log in</Link>
        </p>
      </div>
    </main>
  );
}
