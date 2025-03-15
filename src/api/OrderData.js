import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrdersByUser = async (customerId) => {
  const response = await fetch(`${endpoint}/api/orders/user/${customerId}`); // ✅ Correct API URL
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

export default getOrdersByUser;
