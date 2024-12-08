import React from 'react';

function ViewUser({ user, closeForm }) {
  return (
    <div className="view-user-modal">
      <h2>User Details</h2>
      <div className="user-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Permissions:</strong> {user.permissions.join(', ')}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="modal-actions">
        <button onClick={closeForm}>Close</button>
      </div>
    </div>
  );
}

export default ViewUser;
