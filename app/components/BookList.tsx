"use client";
import { useEffect, useState } from "react";
import BookDetailModal from "./BookDetailModal";
import { useRouter } from "next/navigation";
import { getProducts } from "../api/product";
import { addToCart } from "../api/cart";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  thumbnail: string;
}

export default function BookList({ search = "" }: { search?: string }) {
  const [products, setProducts] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() =>  {
    const fetchProducts = async () => {
      try{
        const products = await getProducts();
        setProducts(products);
      }
      catch(err){
        console.log(err);
        setError(error);
      }
    } 
    fetchProducts();
  }, []);

  const handleAddtoCart = async (book: Book, e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Get ser info(assuming you store user in localStorage)
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const userObj = userStr ? JSON.parse(userStr) : null;
    const userId = userObj ? userObj.id : null;

    if(!userId){
      setError("Please log in to add to cart.");
      return;
    }

    try{
      await addToCart({
        customer_id: userId,
        product_id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      })
      setSuccess("Book added to cart successfully");
    }
    catch(err: any){
      console.log(err);
      setError(err?.response?.data?.message || "Failed to add to cart");
    }
    finally{
      
    }
  }

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h3 className="text-2xl font-bold mb-6 text-green-800">Featured Books</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products
          .filter(book => {
            const q = search.toLowerCase();
            return (
              book.title.toLowerCase().includes(q) ||
              book.author.toLowerCase().includes(q)
            );
          })
          .map(book => (
            <div
              key={book.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
              // onClick={() => setSelectedBook(book)}
            >
              {/* Consider replacing <img> with <Image> from next/image for better performance */}
              <img src={book.thumbnail} alt={book.title} className="w-full h-44 object-cover mb-4 rounded" />
              <div className="font-semibold mb-1 text-center">{book.title}</div>
              <div className="text-sm text-gray-600 mb-2">{book.author}</div>
              <div className="text-green-700 font-bold mb-2">${book.price.toFixed(2)}</div>
              <button className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800" onClick={e => { e.stopPropagation(); handleAddtoCart(book, e); }}>
                Add to Cart
              </button>
            </div>
          ))}
      </div>
      {/* <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} /> */}
    </section>
  );
}