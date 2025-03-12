'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { firebase , clientCredentials } from '@/utils/client';
import { useRouter } from 'next/navigation';

const endpoint = clientCredentials.databaseURL;

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const router = useRouter(); // :white_check_mark: Import Next.js router for redirection
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        // Check if user exists in backend
        const response = await fetch(`${endpoint}/api/users/${fbUser.uid}`);
        if (response.status === 404) {
          console.log('User not found, redirecting to /register');
          router.push('/register'); // :white_check_mark: Redirect new users to register
        } else {
          console.log('User exists, redirecting to home page');
          router.push('/'); // :white_check_mark: Redirect existing users to home
        }
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe(); // Cleanup function
  }, [router]);
  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user],
  );
  return <AuthContext.Provider value={value} {...props} />;
}
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export { AuthProvider, useAuth };
