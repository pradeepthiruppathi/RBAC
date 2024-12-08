import React, { useState, useEffect } from 'react';
import api from '../api';

const PermissionsList = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    api.get('/permissions')
      .then(response => {
        setPermissions(response.data);
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
      });
  }, []);

  const deletePermission = (permissionId) => {
    api.delete(`/permissions/${permissionId}`)
      .then(() => {
        setPermissions(permissions.filter(permission => permission.id !== permissionId));
      })
      .catch(error => {
        console.error('Error deleting permission:', error);
      });
  };

  return (
    <div>
      <h2>Permissions List</h2>
      <ul>
        {permissions.map(permission => (
          <li key={permission.id}>
            {permission.name} 
            <button onClick={() => deletePermission(permission.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionsList;
