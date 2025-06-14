"use client";
import { useState } from "react";
import BookDetailModal from "./BookDetailModal";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  description: string;
};

const mockBooks: Book[] = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', price: 19.99, imageUrl: '/mock/atomic-habits.jpg', description: 'A guide to building good habits and breaking bad ones.' },
  { id: 2, title: 'The Lean Startup', author: 'Eric Ries', price: 22.99, imageUrl: '/mock/lean-startup.jpg', description: 'How today’s entrepreneurs use continuous innovation to create radically successful businesses.' },
  { id: 3, title: 'Deep Work', author: 'Cal Newport', price: 17.99, imageUrl: '/mock/deep-work.jpg', description: 'Rules for focused success in a distracted world.' },
  { id: 4, title: 'Educated', author: 'Tara Westover', price: 15.99, imageUrl: '/mock/educated.jpg', description: 'A memoir about a woman who grew up in a survivalist family and went on to earn a PhD from Cambridge University.' },
];

export default function BookList() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h3 className="text-2xl font-bold mb-6 text-green-800">Featured Books</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {mockBooks.map(book => (
          <div
            key={book.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedBook(book)}
          >
            {/* Consider replacing <img> with <Image> from next/image for better performance */}
            <img src={book.imageUrl} alt={book.title} className="w-32 h-44 object-cover mb-4 rounded" />
            <div className="font-semibold mb-1 text-center">{book.title}</div>
            <div className="text-sm text-gray-600 mb-2">{book.author}</div>
            <div className="text-green-700 font-bold mb-2">${book.price.toFixed(2)}</div>
            <button className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800" onClick={e => { e.stopPropagation(); /* Add to cart logic here */ }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </section>
  );
}
