
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold hover:text-blue-600">
          eKart
        </Link>

        <div className="hidden md:flex space-x-6 text-sm">
          <Link href="/" className="hover:text-blue-800">Home</Link>
          <Link href="/signup" className="hover:text-blue-800">Signup</Link>
          <Link href="/product" className="hover:text-blue-800">Products</Link>
          <Link href="/checkout" className="hover:text-blue-800">Checkout</Link>
        </div>
      </div>
    </nav>
  );
};
