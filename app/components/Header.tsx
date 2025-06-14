import Link from 'next/link';

// Header.tsx
interface HeaderProps {
  user: null | { id: number; email: string; name: string };
}

export default function Header({ user }: HeaderProps) {
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
          <>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <Link href="/logout" className="hover:underline">Logout</Link>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link> Don&apos;t have an account?{' '}
            <Link href="/register" className="text-green-700 hover:underline">Register</Link>
          </>
        )}
        <Link href="/cart" className="ml-4 relative">
          <span className="material-icons align-middle">shopping_cart</span>
        </Link>
      </div>
    </header>
  );
}

