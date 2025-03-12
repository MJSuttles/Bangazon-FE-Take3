// 'use client';

// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';
// import { registerUser } from '../../utils/auth';

// // Step one - Set initialFormState as the default parameter.  Grb the useAuth hook.  Set a useState inside RegistrationForm.  Initialize router object.
// const initialFormState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   address: '',
//   city: '',
//   state: '',
//   zip: '',
// };

// export default function RegistrationForm({ obj = initialFormState }) {
//   const { user, updateUser } = useAuth();
//   const router = useRouter();

//   const [formData, setFormData] = useState(obj);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     registerUser(formData).then(() => updateUser(user.uid));
//     router.push('/');
//   };

//   return (
//     <Container fluid className="d-flex vh-100 justify-content-center align-items-center">
//       <Row className="w-100 justify-content-center">
//         <Col xs={12} md={6} lg={4} className="fixed-width">
//           <Form onSubmit={handleSubmit} style={{ color: 'white' }}>
//             <Form.Group className="mb-3" controlId="formBasicFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control type="text" name="firstName" required placeholder="Enter Your First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control type="text" name="lastName" required placeholder="Enter Your Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" name="email" required placeholder="Enter Your Email" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicAddress">
//               <Form.Label>Street Address</Form.Label>
//               <Form.Control type="text" name="address" required placeholder="Enter Your Street Address" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicCity">
//               <Form.Label>City</Form.Label>
//               <Form.Control type="text" name="city" required placeholder="Enter Your City" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicState">
//               <Form.Label>State</Form.Label>
//               <Form.Control type="text" name="State" required placeholder="Enter Your State" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicZipCode">
//               <Form.Label>Zip Code</Form.Label>
//               <Form.Control type="text" name="Zip code" required placeholder="Enter Your Zip Code" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//             </Form.Group>
//             <Button type="submit" size="lg" className="copy-btn" variant="outline-warning">
//               Submit
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// RegistrationForm.propTypes = {
//   obj: PropTypes.shape({
//     uid: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     address: PropTypes.string.isRequired,
//     city: PropTypes.string.isRequired,
//     state: PropTypes.string.isRequired,
//     zip: PropTypes.string.isRequired,
//   }).isRequired,
// };

'use client';

 // ✅ Ensures this runs only on the client

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

export default function RegistrationForm({ obj = initialFormState }) {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState(obj);
  const [mounted, setMounted] = useState(false); // ✅ Prevents SSR errors
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // ✅ Ensures the component only runs on the client
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => {
      updateUser(user.uid);
      router.push('/'); // ✅ Ensure `router` is used only on the client
    });
  };

  if (!mounted) return null; // ✅ Prevents "NextRouter not mounted" errors

  return (
    <Container fluid className="d-flex vh-100 justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="fixed-width">
          <Form onSubmit={handleSubmit} style={{ color: 'white' }}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" required placeholder="Enter Your First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" required placeholder="Enter Your Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required placeholder="Enter Your Email" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" name="address" required placeholder="Enter Your Street Address" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" required placeholder="Enter Your City" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" required placeholder="Enter Your State" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" name="zip" required placeholder="Enter Your Zip Code" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Button type="submit" size="lg" className="copy-btn" variant="outline-warning">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationForm.propTypes = {
  obj: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
};
