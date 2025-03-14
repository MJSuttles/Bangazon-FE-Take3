import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCart = async (userId) => {
  const response = await fetch(`${endpoint}/api/cart/${userId}`); // ✅ Correct API URL
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

const addPaymentToCart = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/cart/add-payment`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getCart, addPaymentToCart };
