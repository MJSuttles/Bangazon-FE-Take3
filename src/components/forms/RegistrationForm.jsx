'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

function RegistrationForm() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    uid: user?.uid || '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => {
      updateUser(user?.uid);
      router.push('/');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9', color: 'black' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      <form style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '400px' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="firstName">
            First Name
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="lastName">
            Last Name
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="email">
            Email
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="password">
            Password
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="address">
            Address
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="address" name="address" required value={formData.address} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="city">
            City
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="city" name="city" required value={formData.city} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="state">
            State
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="state" name="state" required value={formData.state} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }} htmlFor="zip">
            Zip Code
          </label>
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} type="text" id="zip" name="zip" required value={formData.zip} onChange={handleChange} />
        </div>

        <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

RegistrationForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default RegistrationForm;
