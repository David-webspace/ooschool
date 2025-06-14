"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch) onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex items-center gap-2 mb-8">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for books, authors, ISBN..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
        Search
      </button>
    </form>
  );
}
