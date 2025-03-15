import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// ✅ Fetch available payment options
const getPaymentOptions = async () => {
  const response = await fetch(`${endpoint}/api/payment-options`);
  if (!response.ok) throw new Error('Failed to fetch payment options');
  return response.json();
};

// ✅ Add a selected payment method to the cart
const addPaymentToCart = async (userId, paymentMethodId) => {
  const response = await fetch(`${endpoint}/api/cart/add-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      paymentMethodId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add payment method.');
  }

  return response.json();
};

// ✅ Export functions
export { getPaymentOptions, addPaymentToCart };
