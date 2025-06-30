'use client'
import { getCart, addToCart, removeFromCart } from "../api/cart"
import { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCart() {
            setLoading(true);
            setError(null);
            try {
                const res = await getCart();
                if (!res.ok) throw new Error('Failed to fetch cart');
                const data = await res.json();
                // data.cart is an array or null
                setCart(data.cart ? JSON.parse(data.cart) : []);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, []);

    return (
        <>
            <h1>Cart</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>Error: {error}</p>}
            {!loading && !error && (
                <div>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <table style={{width:'100%', borderCollapse:'collapse'}}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Added At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.added_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </>
    );
}