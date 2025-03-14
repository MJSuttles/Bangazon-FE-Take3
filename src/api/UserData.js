import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/${uid}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/new`, {
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

export { getUser, createUser };
