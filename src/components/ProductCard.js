'use client';

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function ProductCard({ productObj, onUpdate }) {
  // ✅ Function to handle adding to cart
  const handleAddToCart = () => {
    fetch(`/api/cart/add/${productObj.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: productObj.id, quantity: 1 }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to add to cart');
        return response.json();
      })
      .then(() => {
        console.log('✅ Product added to cart:', productObj.id);
        onUpdate(); // ✅ Trigger onUpdate to refresh the cart
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  return (
    <div className="row align-items-center border my-3 d-flex container" style={{ width: '70%', height: '7rem' }}>
      <div className="col">
        <p>{productObj.name}</p>
      </div>
      <div className="col">
        <p>{productObj.isAvailable ? 'Available' : 'Out of Stock'}</p>
      </div>
      <div className="col">
        <p>${productObj.price}</p>
      </div>
      <div className="col">
        <img src={productObj.image} alt={productObj.name} width="50" />
      </div>
      <div className="col">
        <p>{productObj.description}</p>
      </div>
      <div className="col">
        <p>Qty: {productObj.quantity}</p>
      </div>
      <div className="col">
        <p>Category: {productObj.categoryId}</p>
      </div>
      <div className="col">
        <p>Seller ID: {productObj.sellerId}</p>
      </div>
      <div className="col">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Options
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href={`/products/${productObj.id}`} passHref>
                View Product
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAddToCart}>Add to Cart</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
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
