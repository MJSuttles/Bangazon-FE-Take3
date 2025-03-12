import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const endpoint = clientCredentials.databaseURL;

const checkUser = async (uid) => {
  try {
    const response = await fetch(`${endpoint}/checkuser/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {}; // ✅ Return empty object instead of null
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking user:', error);
    return {}; // ✅ Ensure a valid return type
  }
};

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    console.log('API Endpoint:', endpoint); // ✅ Debugging line
    fetch(`${endpoint}/users`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch((error) => {
        console.error('Error registering user:', error); // ✅ Log the error
        reject(error);
      });
  });

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
