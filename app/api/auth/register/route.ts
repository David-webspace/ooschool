import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({ uri: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const conn = await pool.getConnection();
    try {
      const [userExists] = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
      if ((userExists as any[]).length > 0) {
        return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await conn.query(
        'INSERT INTO users(email, password_hash, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
      );
      return NextResponse.json({ email, name });
    } finally {
      conn.release();
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
