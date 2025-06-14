import React from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  description: string;
};

export default function BookDetailModal({ book, onClose }: { book: Book | null; onClose: () => void }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-green-700 text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Consider replacing <img> with <Image> from next/image for better performance */}
          <img src={book.imageUrl} alt={book.title} className="w-36 h-52 object-cover rounded mb-4 md:mb-0" />
          <div>
            <h2 className="text-2xl font-bold mb-2 text-green-900">{book.title}</h2>
            <div className="text-md text-gray-700 mb-2">by {book.author}</div>
            <div className="text-lg text-green-700 font-bold mb-4">${book.price.toFixed(2)}</div>
            <p className="mb-4 text-gray-800">{book.description}</p>
            <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
