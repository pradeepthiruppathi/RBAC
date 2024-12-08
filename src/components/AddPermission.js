import React, { useState } from 'react';
import api from '../api';

const AddPermission = () => {
  const [permissionName, setPermissionName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPermission = { name: permissionName };

    api.post('/permissions', newPermission)
      .then(response => {
        console.log('Permission created:', response.data);
        setPermissionName('');
      })
      .catch(error => {
        console.error('Error creating permission:', error);
      });
  };

  return (
    <div>
      <h2>Add Permission</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Permission Name"
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
          required
        />
        <button type="submit">Add Permission</button>
      </form>
    </div>
  );
};

export default AddPermission;
