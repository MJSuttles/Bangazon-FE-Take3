import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllProducts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/products`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getProductDetails = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getProductsByCategory = (categoryId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/products/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getProductsBySeller = (sellerId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/products/seller/${sellerId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getLatestProducts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/products/latest`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllProducts, getProductDetails, getProductsByCategory, getProductsBySeller, getLatestProducts };
