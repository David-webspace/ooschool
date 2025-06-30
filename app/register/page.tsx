"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { register } from "../api/auth";
import Link from "next/link";

export default function Registerpage(){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setError("");
    setSuccess(false);

    //axios
    try{
      await register({
        first_name: firstName,
        last_name: lastName,
        email: email,
        passwords: passwords,
        phone_number: phoneNumber
      });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    }catch(err: any){
      setError(err.message || "Registration failed");
    }
  }

  return(
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-400">
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="px-4 py-2 border rounded" 
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
          className="px-4 py-2 border rounded" 
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border rounded" 
        />
        <input
          type="password"
          value={passwords}
          placeholder="Password"
          onChange={(e) => setPasswords(e.target.value)}
          required
          className="px-4 py-2 border rounded" 
        />
        <input
          type="text"
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="px-4 py-2 border rounded" 
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Register Success!</div>}
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
          Register
        </button>
        <div className="mt-4 text-sm text-center">
          Already have a account? 
          <Link href="/login" className="text-green-700 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  )
}