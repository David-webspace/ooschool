import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Note: You may need to install @types/jsonwebtoken for TypeScript support

const pool = mysql.createPool({ uri: process.env.DATABASE_URL });

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_this';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password.' }, { status: 400 });
    }
    const conn = await pool.getConnection();
    try {
      const [userRows] = await conn.query('SELECT id, email, name, password_hash FROM users WHERE email = ?', [email]);
      if ((userRows as any[]).length === 0) {
        console.log(`Login failed: user not found for email ${email}`);
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }
      const user = (userRows as any[])[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        console.log(`Login failed: password mismatch for email ${email}`);
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }
      // Create JWT and set as HTTP-only cookie
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      const response = NextResponse.json({ id: user.id, email: user.email, name: user.name });
      response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
