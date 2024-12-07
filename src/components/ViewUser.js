import React from 'react';
import { FaEye } from 'react-icons/fa';

const ViewUser = ({ user }) => {
  if (!user) {
    return null; // Return null if no user is selected for viewing
  }

  return (
    <div className="view-user-container">
      <h3>User Details</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.status}</p>
      <p><strong>Permissions:</strong> {user.permissions.join(', ')}</p>
      <button className="close-btn">Close</button>
    </div>
  );
};

export default ViewUser;
