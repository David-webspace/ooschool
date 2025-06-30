import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_this';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user: null | { id: number; email: string; name: string } = null;
  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET) as { id: number; email: string; name: string };
    } catch {
      user = null;
    }
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Not Authorized</h2>
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link href="/login" className="text-green-700 hover:underline">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Profile</h2>
      <div className="mb-4">
        <span className="font-semibold">Name:</span> {user.name}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <div className="mb-4">
        <span className="font-semibold">User ID:</span> {user.id}
      </div>
    </div>
  );
}
