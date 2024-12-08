import React, { useState, useEffect } from 'react';
import api from '../api';

const RolesList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api.get('/roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const deleteRole = (roleId) => {
    api.delete(`/roles/${roleId}`)
      .then(() => {
        setRoles(roles.filter(role => role.id !== roleId));
      })
      .catch(error => {
        console.error('Error deleting role:', error);
      });
  };

  return (
    <div>
      <h2>Roles List</h2>
      <ul>
        {roles.map(role => (
          <li key={role.id}>
            {role.name} 
            <button onClick={() => deleteRole(role.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RolesList;
