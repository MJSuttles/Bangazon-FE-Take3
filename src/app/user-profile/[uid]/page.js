'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getUser } from '../../../api/UserData';

export default function UserProfile() {
  const { user } = useAuth(); // ✅ Get logged-in user
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      getUser(user.uid)
        .then((data) => setUserDetails(data))
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, [user]);

  if (!userDetails) return <p>No user details found.</p>;

  return (
    <div className="my-4 user-detail">
      <p>
        First Name: <strong>{userDetails.firstName || 'N/A'}</strong>
      </p>
      <p>
        Last Name: <strong>{userDetails.lastName || 'N/A'}</strong>
      </p>
      <p>
        Email: <strong>{userDetails.email || 'N/A'}</strong>
      </p>
      <p>
        Address: <strong>{userDetails.address || 'N/A'}</strong>
      </p>
      <p>
        City: <strong>{userDetails.city || 'N/A'}</strong>
      </p>
      <p>
        State: <strong>{userDetails.state || 'N/A'}</strong>
      </p>
      <p>
        Zip: <strong>{userDetails.zip || 'N/A'}</strong>
      </p>
    </div>
  );
}
