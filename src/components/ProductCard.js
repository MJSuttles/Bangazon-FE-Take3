'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import useRouter
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function ProductCard({ productObj, onUpdate }) {
  const router = useRouter(); // ✅ Use Next.js router for navigation

  // ✅ Function to handle adding to cart
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`http://localhost:5215/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'), // ✅ Ensure the userId is available
          productId: productObj.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      await response.json();
      console.log('✅ Product added to cart:', productObj.id);

      onUpdate(); // ✅ Refresh cart after adding product
      router.push('/cart'); // ✅ Redirect to Cart page
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Card className="product-card my-3 shadow">
      <Card.Img variant="top" src={productObj.image} alt={productObj.name} className="product-image" />
      <Card.Body>
        <Card.Title className="text-center">{productObj.name}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${productObj.price}
        </Card.Text>
        <Card.Text>
          <strong>Available:</strong> {productObj.isAvailable ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text>
          <strong>Quantity:</strong> {productObj.quantity}
        </Card.Text>
        <Card.Text>
          <strong>Category:</strong> {productObj.categoryId}
        </Card.Text>
        <Card.Text>
          <strong>Seller ID:</strong> {productObj.sellerId}
        </Card.Text>
        <Card.Text className="description">
          <strong>Description:</strong> {productObj.description}
        </Card.Text>

        <div className="d-flex justify-content-between">
          <Link href={`/products/${productObj.id}`} passHref>
            <Button variant="primary">View</Button>
          </Link>
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    sellerId: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
