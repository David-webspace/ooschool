"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwords, setPasswords] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        passwords: passwords
      }),
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } else {
      const data = await res.json();
      setError(data.message || data.error || "Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-300">
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={passwords}
          onChange={e => setPasswords(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 border rounded"
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-700 text-sm">Registration successful! Redirecting...</div>}
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
          Register
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        Already have an account? <a href="/login" className="text-green-700 hover:underline">Login</a>
      </div>
    </div>
  );
}
