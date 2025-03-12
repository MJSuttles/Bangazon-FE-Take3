import React from 'react';
import PropTypes from 'prop-types';

export default function UserCard({ userObj }) {
  if (!userObj) {
    return <p>No user data available</p>;
  }

  return (
    <div className="row align-items-center border my-3 d-flex container" style={{ width: '70%', height: '7rem' }}>
      <div className="col">
        <p>{userObj.FirstName || 'N/A'}</p>
      </div>
      <div className="col">
        <p>{userObj.LastName || 'N/A'}</p>
      </div>
      <div className="col">
        <p>{userObj.Email || 'N/A'}</p>
      </div>
      <div className="col">
        <p>{userObj.Address || 'N/A'}</p>
      </div>
      <div className="col">
        <p>{userObj.City || 'N/A'}</p>
      </div>
      <div className="col">
        <p>{userObj.State || 'N/A'}</p>
      </div>
      <div className="col">
        <p>{userObj.Zip || 'N/A'}</p>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
    City: PropTypes.string.isRequired,
    State: PropTypes.string.isRequired,
    Zip: PropTypes.string.isRequired,
  }).isRequired,
};
