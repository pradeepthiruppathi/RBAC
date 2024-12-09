import React, { useState } from 'react';

const initialRoles = [
  { id: 1, roleName: 'Admin', permissions: ['Full Access', 'Manage Users', 'View Reports'] },
  { id: 2, roleName: 'Editor', permissions: ['Edit Content', 'View Reports'] },
  { id: 3, roleName: 'Viewer', permissions: ['View Content'] }
];

const RBAC = ({ searchTerm, data }) => {
  const [roles, setRoles] = useState(initialRoles);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState('');

  const handleAddRole = () => {
    if (!newRoleName) {
      alert('Role name is required');
      return;
    }
    if (!newRolePermissions) {
      alert('Permissions are required');
      return;
    }

    const newRole = {
      id: roles.length + 1,
      roleName: newRoleName,
      permissions: newRolePermissions.split(',').map(permission => permission.trim())
    };

    setRoles([...roles, newRole]);
    setNewRoleName('');
    setNewRolePermissions('');
  };

  const handleRemoveRole = (roleId) => {
    const updatedRoles = roles.filter(role => role.id !== roleId);
    setRoles(updatedRoles);
  };

  const handleRoleChange = (roleId, permissions) => {
    const updatedRoles = roles.map(role =>
      role.id === roleId ? { ...role, permissions } : role
    );
    setRoles(updatedRoles);
  };

  return (
    <div>
      <h2>Role-Based Access Control (RBAC)</h2>
      <div>
        <h3>Add New Role</h3>
        <div>
          <input
            type="text"
            placeholder="Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Permissions (comma separated)"
            value={newRolePermissions}
            onChange={(e) => setNewRolePermissions(e.target.value)}
          />
        </div>
        <button onClick={handleAddRole}>Add Role</button>
      </div>

      <h3>Roles and Permissions</h3>
      {roles.length === 0 ? (
        <p>No roles available</p>
      ) : (
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              <h4>{role.roleName}</h4>
              <ul>
                {role.permissions.map((permission, index) => (
                  <li key={index}>{permission}</li>
                ))}
              </ul>
              <button onClick={() => handleRemoveRole(role.id)}>Remove Role</button>
              <button
                onClick={() => {
                  const newPermissions = prompt('Enter new permissions (comma separated):', role.permissions.join(','));
                  if (newPermissions) {
                    handleRoleChange(role.id, newPermissions.split(',').map(permission => permission.trim()));
                  }
                }}
              >
                Edit Permissions
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RBAC;
