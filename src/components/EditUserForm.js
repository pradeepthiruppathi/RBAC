import React, { useState } from 'react';

function EditUserForm({ user, closeForm }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [status, setStatus] = useState(user.status);

  const handleSubmit = () => {
    const updatedUser = { ...user, name, email, status };
    // Submit the updated user data to the backend or state
    console.log('Editing user:', updatedUser);
    closeForm();
  };

  return (
    <div className="edit-user-form">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
}

export default EditUserForm;
