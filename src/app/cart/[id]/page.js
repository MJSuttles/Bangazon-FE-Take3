'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // ✅ Import router for navigation
import { getCart } from '../../../api/CartData'; // ✅ Import API

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // ✅ Get user ID from the URL
  const router = useRouter(); // ✅ Initialize Next.js router

  useEffect(() => {
    if (id) {
      getCart(id)
        .then((cartData) => setCart(cartData))
        .catch((error) => console.error('Error loading cart:', error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!cart || cart.cartItems.length === 0) return <p>No items in cart.</p>;

  return (
    <div className="container text-center my-4">
      <h1>Your Cart</h1>
      {cart.cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.product.image} alt={item.product.name} width={50} />
          <p>
            {item.product.name} - ${item.product.price} (Qty: {item.quantity})
          </p>
        </div>
      ))}

      {/* ✅ Add "Continue Shopping" and "Checkout" buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          type="button" // ✅ Explicitly set type="button"
          className="btn btn-secondary"
          onClick={() => router.push('/')}
        >
          ➕ Add More Items
        </button>

        <button
          type="button" // ✅ Explicitly set type="button"
          className="btn btn-primary"
          onClick={() => router.push('/order/new')}
        >
          🛒 Checkout
        </button>
      </div>
    </div>
  );
}
