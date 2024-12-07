import React, { useState, useEffect } from 'react';
import { FaEye, FaTrashAlt, FaEdit } from 'react-icons/fa'; // Add FaEye here
import CreateUserForm from './CreateUserForm';  // Import CreateUserForm
import EditUserForm from './EditUserForm';    // Import EditUserForm
import ViewUser from './ViewUser';             // Import ViewUser Component
import DownloadUser from './DownloadUser';     // Import DownloadUser Component
import '../styles/users.css';

function Users() {
  const [userData, setUserData] = useState([]);
  const [roles, setRoles] = useState([]); // For storing roles available
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('active');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch('/api/users'); // Fetch user data
        const userData = await userResponse.json();
        setUserData(userData);
        setLoading(false);

        const rolesResponse = await fetch('/api/roles'); // Fetch roles data
        const rolesData = await rolesResponse.json();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateUser = () => setModalType('create');
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalType('edit');
  };
  const handleDeleteUser = (userId) => {
    setUserData(userData.filter((user) => user.id !== userId));
  };

  const handleSearch = (event) => setSearchQuery(event.target.value);
  const handleSort = (event) => setSortOption(event.target.value);

  const handleCloseModal = () => setModalType(null);

  // Filtering and sorting logic
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="buttons-container">
      {/* Action Buttons below the Table */}
      <div className="action-buttons">
        <button className="action-btn create-btn" onClick={handleCreateUser}>
          <FaEdit /> Create User
        </button>
        <button className="action-btn edit-btn" onClick={() => handleEditUser(null)}>
          <FaEdit /> Edit User
        </button>
        <button className="action-btn view-btn" onClick={() => setSelectedUser(null)}>
          <FaEye /> View User
        </button>
        <DownloadUser users={userData} />
      </div>

      <div className="users-container">
        <div className="users-header">
          <div className="header-left">
            <h2>User List</h2>
          </div>
        </div>

        {/* Sorting and Searching Options */}
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

        {/* User Table */}
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
                <td>
                  <div
                    className={`status-box ${user.status === 'active' ? 'active' : 'inactive'}`}
                  >
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </td>
                <td className="actions-cell">
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <FaTrashAlt />
                  </button>
                  <button onClick={() => handleEditUser(user)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Create / Edit */}
        {modalType === 'create' && (
          <div className="modal">
            <h3>Create User</h3>
            <CreateUserForm roles={roles} />
            <button type="button" onClick={handleCloseModal}>Close</button>
          </div>
        )}

        {modalType === 'edit' && selectedUser && (
          <div className="modal">
            <h3>Edit User</h3>
            <EditUserForm user={selectedUser} roles={roles} />
            <button type="button" onClick={handleCloseModal}>Close</button>
          </div>
        )}

        {/* View User Modal */}
        {selectedUser && <ViewUser user={selectedUser} />}
      </div>
    </div>
  );
}

export default Users;
