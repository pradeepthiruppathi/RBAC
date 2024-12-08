import React, { useState } from 'react';
import api from '../api';

const AddRole = () => {
  const [roleName, setRoleName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRole = { name: roleName };

    api.post('/roles', newRole)
      .then(response => {
        console.log('Role created:', response.data);
        setRoleName('');
      })
      .catch(error => {
        console.error('Error creating role:', error);
      });
  };

  return (
    <div>
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />
        <button type="submit">Add Role</button>
      </form>
    </div>
  );
};

export default AddRole;
