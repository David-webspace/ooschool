"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 border rounded"
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
          Login
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        Don&apos;t have an account? <a href="/register" className="text-green-700 hover:underline">Register</a>
      </div>
    </div>
  );
}
