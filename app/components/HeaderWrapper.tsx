import Header from './Header';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_this';

export default async function HeaderWrapper() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET) as { id: number; email: string; name: string };
    } catch (e) {
      user = null;
    }
  }
  return <Header user={user} />;
}
