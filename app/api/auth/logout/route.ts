// /app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the 'token' cookie by setting it to empty and expiring it immediately
  return NextResponse.json(
    { message: 'Logged out' },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;',
      },
    }
  );
}