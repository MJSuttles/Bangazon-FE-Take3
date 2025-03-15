'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import getOrdersByUser from '../api/OrderData'; // Fetch user orders

export default function OrderCard() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders for the logged-in user
  useEffect(() => {
    if (user?.uid) {
      getOrdersByUser(user.uid)
        .then(setOrders)
        .catch((error) => console.error('Error loading orders:', error))
        .finally(() => setLoading(false));
    }
  }, [user?.uid]);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="container text-center my-4">
      <h1>Your Orders</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="order-card my-3 shadow">
            <Card.Body>
              <Card.Title className="text-center">Order #{order.id}</Card.Title>
              <Card.Text>
                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Payment Method:</strong> {order.userPaymentMethodId ? `Method #${order.userPaymentMethodId}` : 'Not Selected'}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {order.isComplete ? '✅ Completed' : '⌛ Pending'}
              </Card.Text>
              <Card.Text>
                <strong>Total Items:</strong> {order.orderItems?.length || 0}
              </Card.Text>

              <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={() => router.push(`/customer-dashboard/${order.id}`)}>
                  View Order
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
