"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Header.tsx
interface HeaderProps {
  user: null | { id: number; email: string; name: string };
}

export default function Header() {
  type UserType = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <header className="w-full bg-green-700 text-white py-4 px-8 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="text-2xl font-bold tracking-tight">BookStore</span>
        </Link>
        <nav className="hidden md:flex gap-6 ml-8">
          <Link href="/category/new">New Releases</Link>
          <Link href="/category/bestsellers">Bestsellers</Link>
          <Link href="/category/children">Children's Books</Link>
          <Link href="/category/foreign">Foreign Books</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-bold text-green-700 bg-white px-3 py-1 rounded">{user.first_name}</span>
            <button
              className="ml-2 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="hover:underline">Login</Link> Don't have an account?{' '}
            <Link href="/register" className="text-green-700 hover:underline">Register</Link>
          </div>
        )}
        <Link href="/cart" className="ml-4 relative">
          <span className="material-icons align-middle">shopping_cart</span>
        </Link>
      </div>
    </header>
  );
}
