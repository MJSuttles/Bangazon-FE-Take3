'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../utils/context/authContext'; // ✅ Import auth context
import { getCart, addPaymentToCart } from '../../../api/CartData';
import { getPaymentOptions } from '../../../api/PaymentOptionData';

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('');
  const { id } = useParams();
  const { user } = useAuth(); // ✅ Get user from auth context
  const router = useRouter();

  // ✅ Fetch cart data
  useEffect(() => {
    if (id) {
      getCart(id)
        .then((cartData) => setCart(cartData))
        .catch((error) => console.error('Error loading cart:', error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // ✅ Fetch payment options
  useEffect(() => {
    getPaymentOptions()
      .then(setPaymentOptions)
      .catch((error) => console.error('Error fetching payment options:', error));
  }, []);

  // ✅ Handle payment selection
  const handlePaymentSelection = (event) => {
    setSelectedPaymentMethodId(event.target.value);
  };

  // ✅ Save selected payment method to the cart
  const handleAddPaymentMethod = async () => {
    try {
      if (!selectedPaymentMethodId) {
        console.error('No payment method selected.');
        return;
      }

      console.log('📤 Sending request:', { userId: user.uid, paymentMethodId: selectedPaymentMethodId });

      const response = await addPaymentToCart(user.uid, selectedPaymentMethodId);

      console.log('✅ Payment method added successfully:', response);
    } catch (error) {
      console.error('❌ Error adding payment method:', error);
    }
  };

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

      {/* ✅ Payment Option Dropdown */}
      <div className="mt-4">
        <label htmlFor="payment-method" className="form-label">
          Select Payment Method:
        </label>
        <select id="payment-method" className="form-select" value={selectedPaymentMethodId} onChange={handlePaymentSelection}>
          <option value="">-- Choose a Payment Option --</option>
          {paymentOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.type}
            </option>
          ))}
        </select>

        {/* ✅ Add Payment Method Button */}
        <button type="button" className="btn btn-success mt-2" onClick={handleAddPaymentMethod}>
          💳 Add Payment Method
        </button>
      </div>

      {/* ✅ Continue Shopping & Checkout Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button type="button" className="btn btn-secondary" onClick={() => router.push('/')}>
          ➕ Add More Items
        </button>

        <button type="button" className="btn btn-primary" onClick={() => router.push('/order/new')}>
          🛒 Checkout
        </button>
      </div>
    </div>
  );
}
