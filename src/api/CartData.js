import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCart = async (userId) => {
  const response = await fetch(`${endpoint}/api/cart/${userId}`); // ✅ Correct API URL
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

const addPaymentToCart = async (userId, paymentMethodId) => {
  const payload = {
    userId,
    paymentMethodId: parseInt(paymentMethodId, 10), // ✅ Convert again to ensure correct type
  };

  console.log('📤 API Call - Sending Payload:', JSON.stringify(payload, null, 2));

  const response = await fetch(`${endpoint}/api/cart/add-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log('📥 API Response Status:', response.status);

  if (!response.ok) {
    const errorText = await response.text(); // ✅ Get error response
    console.error('❌ API Error Response:', errorText);
    throw new Error(`Failed to add payment method: ${errorText}`);
  }

  return response.json();
};

export { getCart, addPaymentToCart };
