'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProductDetails } from '../../../api/ProductData';

export default function ProductDetails() {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductDetails(id)
        .then((product) => setSingleProduct(product))
        .catch((error) => console.error('Error fetching product details:', error));
    }
  }, [id]);

  if (!singleProduct) return <p>Loading product details...</p>;

  return (
    <div className="text-center my-3">
      <h1>Product Details</h1>
      <div className="my-4 product-info">
        <p>
          Name: <strong>{singleProduct.name}</strong>
        </p>
        <p>
          Available: <strong>{singleProduct.isAvailable ? 'Yes' : 'No'}</strong>
        </p>
        <p>
          Price: <strong>${singleProduct.price}</strong>
        </p>
        <p>
          <strong>Image:</strong> <br />
          <Image
            src={singleProduct.image}
            alt={singleProduct.name}
            width={200}
            height={200} // ✅ Required for Next.js Image
            layout="intrinsic" // ✅ Ensures correct scaling
          />
        </p>
        <p>
          Description: <strong>{singleProduct.description}</strong>
        </p>
        <p>
          Quantity: <strong>{singleProduct.quantity}</strong>
        </p>
        <p>
          Category: <strong>{singleProduct.category}</strong> {/* ✅ Display category name */}
        </p>
        <p>
          Seller: <strong>{singleProduct.sellerId || 'Unknown'}</strong> {/* ✅ Now directly from API */}
        </p>
      </div>
    </div>
  );
}
