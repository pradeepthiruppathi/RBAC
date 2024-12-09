import React, { useState } from 'react';
import { FaEye, FaTrashAlt, FaEdit } from 'react-icons/fa';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import ViewUser from './ViewUser';
import DownloadUser from './DownloadUser';
import '../styles/users.css';

function Users() {
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Admin',
      permissions: ['Create', 'Read', 'Update', 'Delete'],
      status: 'active',
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Editor',
      permissions: ['Create', 'Read', 'Update'],
      status: 'inactive',
      createdAt: '2024-02-01',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      role: 'Viewer',
      permissions: ['Read'],
      status: 'active',
      createdAt: '2024-03-15',
    },
    {
      id: 4,
      name: 'Bob Brown',
      role: 'Editor',
      permissions: ['Create', 'Read'],
      status: 'inactive',
      createdAt: '2024-04-01',
    },
  ]);

  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('active');

  const handleAddUser = (newUser) => {
    const userWithId = { ...newUser, id: userData.length + 1 };
    setUserData([...userData, userWithId]);
    setModalType(null); // Close modal
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalType('edit');
  };

  const handleDeleteUser = (userId) => {
    setUserData(userData.filter((user) => user.id !== userId));
  };

  const handleSearch = (event) => setSearchQuery(event.target.value);
  const handleSort = (event) => setSortOption(event.target.value);

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOption === 'active') {
      return a.status === 'active' ? -1 : 1;
    } else if (sortOption === 'recentlyAdded') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="users-container">
      <div className="action-buttons">
        <button className="action-btn create-btn" onClick={() => setModalType('create')}>
          <FaEdit /> Create User
        </button>
        <DownloadUser users={userData} />
      </div>

      <div className="users-header">
        <h2>User List</h2>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search User"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={sortOption} onChange={handleSort}>
          <option value="active">Active</option>
          <option value="recentlyAdded">Recently Added</option>
          <option value="name">Name</option>
        </select>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.permissions.join(', ')}</td>
              <td>{user.status}</td>
              <td className="actions-cell">
                <button onClick={() => handleDeleteUser(user.id)}>
                  <FaTrashAlt />
                </button>
                <button onClick={() => handleEditUser(user)}>
                  <FaEdit />
                </button>
                <button onClick={() => setSelectedUser(user) & setModalType('view')}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals for Create, Edit, and View */}
      {modalType === 'create' && (
        <div className="modal">
          <CreateUserForm closeForm={handleCloseModal} onCreateUser={handleAddUser} />
        </div>
      )}
      {modalType === 'edit' && selectedUser && (
        <div className="modal">
          <EditUserForm
            user={selectedUser}
            closeForm={handleCloseModal}
            onEditUser={(updatedUser) => {
              setUserData(
                userData.map((user) =>
                  user.id === updatedUser.id ? updatedUser : user
                )
              );
              handleCloseModal();
            }}
          />
        </div>
      )}
      {modalType === 'view' && selectedUser && (
        <div className="modal">
          <ViewUser user={selectedUser} closeForm={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default Users;
