import React, { useState, useEffect, useCallback } from 'react';
import QuickActions from './QuickActions';
import ActivityLog from './ActivityLog';
import StatBoxes from './StatBoxes';
import '../styles/dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [permissionsCount, setPermissionsCount] = useState(0);

  // Update stats function
  const updateStats = useCallback((data) => {
    setTotalUsers(data.length);
    setActiveUsers(data.filter((user) => user.status === 'Active').length);
    const uniquePermissions = new Set(
      data.flatMap((user) => user.permissions || [])
    ).size;
    setPermissionsCount(uniquePermissions);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersFromAPI = [

          { name: 'John Doe', role: 'Admin', permissions: ['View Dashboard'], status: 'Active' },
          { name: 'Jane Smith', role: 'User', permissions: ['View Dashboard'], status: 'Inactive' },
          {
            name: 'Jane Smith',
            role: 'User',
            permissions: ['View Dashboard'],
            status: 'Inactive'
          },
          {
            name: 'Alice Johnson',
            role: 'Editor',
            permissions: ['View Dashboard', 'Edit Posts'],
            status: 'Active'
          },
          {
            name: 'Bob Brown',
            role: 'User',
            permissions: ['View Dashboard'],
            status: 'Active'
          },
          {
            name: 'Charlie Davis',
            role: 'Moderator',
            permissions: ['View Dashboard', 'Moderate Content'],
            status: 'Inactive'
          }
        ];

        setUserData(usersFromAPI);
        updateStats(usersFromAPI);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [updateStats]);

  // Add user handler
  const handleAddUser = (newUser) => {
    const updatedData = [...userData, newUser];
    setUserData(updatedData);
    updateStats(updatedData);
  };

  // Sorting logic
  const sortUsers = (type) => {
    const sortedData = [...userData];
    if (type === 'name') sortedData.sort((a, b) => a.name.localeCompare(b.name));
    else if (type === 'status') sortedData.sort((a, b) => a.status.localeCompare(b.status));
    setUserData(sortedData);
  };

  return (
    <div className="dashboard">
      <StatBoxes
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        permissionsCount={permissionsCount}
      />
      <div className="user-data-quick-actions">
        <div className="user-data">
          <h3>All Users</h3>
          <button
            className="recently-added-btn"
            onClick={() => sortUsers('recent')}
          >
            Recently Added
          </button>
          <select
            onChange={(e) => sortUsers(e.target.value)}
            className="sort-dropdown"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
          <div className="user-table">
            {userData.map((user, index) => (
              <div key={index} className="user-row">
                <div className="user-cell">{user.name}</div>
                <div className="user-cell">{user.role}</div>
                <div className="user-cell">
                  {user.permissions?.join(', ') || 'No permissions'}
                </div>
                <div className={`user-status ${user.status?.toLowerCase()}`}>
                  {user.status || 'Inactive'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="quick-actions">
          <QuickActions onAddUser={handleAddUser} />
        </div>
      </div>
      <ActivityLog userData={userData} />
    </div>
  );
}

export default Dashboard;
