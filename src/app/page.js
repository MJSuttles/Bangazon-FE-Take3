'use client';

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api/OrderData';
import ProductCard from '../components/ProductCard'; // ✅ Ensure ProductCard is imported

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="container text-center my-4" id="products-page">
      <h1 className="my-3">Home / Products</h1>

      <div className="d-flex flex-wrap justify-content-center gap-4">{products.length > 0 ? products.map((product) => <ProductCard key={product.id} productObj={product} onUpdate={getAllProducts} />) : <p>No products available.</p>}</div>
    </div>
  );
}

export default Home;
