'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import getOrdersByUser from '../../api/OrderData';
import OrderCard from '../../components/OrderCard';

function CustomerOrdersPage() {
  const { user } = useAuth(); // ✅ Get authenticated user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user orders
  const fetchOrders = () => {
    if (user?.uid) {
      getOrdersByUser(user.uid)
        .then(setOrders)
        .catch((error) => console.error('Error fetching orders:', error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(
    () => {
      fetchOrders(); // ✅ Fetch orders when component mounts
    },
    [user?.uid],
    fetchOrders,
  );

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="container text-center my-4" id="orders-page">
      <h1 className="my-3">Your Orders</h1>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} orderObj={order} onUpdate={fetchOrders} />
        ))}
      </div>
    </div>
  );
}

export default CustomerOrdersPage;
