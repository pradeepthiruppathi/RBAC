import React, { useState } from 'react';
import '../styles/UserTable.css';
// A mock initial set of users for illustration
const initialUserData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', permissions: ['read', 'write'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', permissions: ['read'] },
  { id: 3, name: 'Sam Brown', email: 'sam@example.com', permissions: [] },
];

const UserTable = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [newUser, setNewUser] = useState({ name: '', email: '', permissions: [] });
  const [modalType, setModalType] = useState(null);

  const handleAddUser = () => {
    // Add a new user with a default permissions array if none provided
    const userWithId = { ...newUser, id: userData.length + 1, permissions: newUser.permissions || [] };
    setUserData([...userData, userWithId]);
    setNewUser({ name: '', email: '', permissions: [] });
    setModalType(null); // Close modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePermissionsChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      permissions: value.split(',').map((perm) => perm.trim()),
    }));
  };

  return (
    <div>
      <h2>User Management</h2>
      <button onClick={() => setModalType('add')}>Add New User</button>

      {/* Modal for adding new user */}
      {modalType === 'add' && (
        <div className="modal">
          <h3>Add New User</h3>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="permissions"
            value={newUser.permissions.join(', ')}
            onChange={handlePermissionsChange}
            placeholder="Permissions (comma-separated)"
          />
          <button onClick={handleAddUser}>Add User</button>
          <button onClick={() => setModalType(null)}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.permissions ? user.permissions.join(', ') : 'No permissions'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
