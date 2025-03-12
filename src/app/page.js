// import { getAllProducts } from "../api/OrderData";

// function Home() {
//   const [products, setProducts] = useState();
//   const { user } = useAuth();

//   useEffect (() => {
//     getAllProducts()
//     .then((data) => setProducts(data))
//     .catch((error) => console.error('Error fetching products:', error))
//   });

//   return (
//     <div className="container text-center my-4" id="products-page">
//     <h1 className="my-3" style={{ textAlign: 'center', marginLeft: '0' }}>
//       Home / Products
//     </h1>
//     {/* <SearchBar /> */}

//     {/* <div className="d-flex flex-column align-items-center ps-5">
//       {songs.map((song) => (
//         <ProductCard key={product.id} productObj={product} onUpdate={getAllProducts} />
//       ))}
//     </div> */}
//   </div>
// );
//   );
// }

// export default Home;

'use client';

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api/OrderData';
// import { useAuth } from "../utils/context/authContext";
import ProductCard from '../components/ProductCard'; // ✅ Ensure ProductCard is imported

function Home() {
  const [products, setProducts] = useState([]); // ✅ Initialized as an empty array

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []); // ✅ Dependency array prevents infinite re-renders

  return (
    <div className="container text-center my-4" id="products-page">
      <h1 className="my-3" style={{ textAlign: 'center', marginLeft: '0' }}>
        Home / Products
      </h1>
      {/* <SearchBar /> */}

      <div className="d-flex flex-column align-items-center ps-5">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} productObj={product} onUpdate={getAllProducts} />)
        ) : (
          <p>No products available.</p> // ✅ Prevent errors if `products` is empty
        )}
      </div>
    </div>
  );
}

export default Home;
