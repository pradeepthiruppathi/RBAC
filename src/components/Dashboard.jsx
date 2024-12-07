// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import QuickActions from './QuickActions';
import ActivityLog from './ActivityLog';
import StatBoxes from './StatBoxes';
import '../styles/dashboard.css'; // Importing custom CSS for styling

function Dashboard() {
  const [userData, setUserData] = useState([]); // State for user data
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [permissionsCount, setPermissionsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      // Example API data (replace with actual API call)
      const usersFromAPI = [
        { name: 'John Doe', role: 'Admin', permissions: 'Read, Write', status: 'Active' },
        { name: 'Jane Smith', role: 'User', permissions: 'Read', status: 'Inactive' },
        { name: 'Alice Johnson', role: 'Admin', permissions: 'Read', status: 'Active' },
        { name: 'Bob Brown', role: 'User', permissions: 'Read, Write', status: 'Active' },
        { name: 'Bob Brown', role: 'User', permissions: 'Read, Write', status: 'Active' },
      ];

      setUserData(usersFromAPI);
      setTotalUsers(usersFromAPI.length);
      setActiveUsers(usersFromAPI.filter(user => user.status === 'Active').length);
      setPermissionsCount(new Set(usersFromAPI.map(user => user.permissions)).size); // Unique permissions count
    };

    fetchUserData();
  }, []);

  const sortUsers = (type) => {
    const sortedData = [...userData];
    if (type === 'name') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'status') {
      sortedData.sort((a, b) => a.status.localeCompare(b.status));
    }
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
          <button className="recently-added-btn">Recently Added</button>

          <select onChange={(e) => sortUsers(e.target.value)} className="sort-dropdown">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>

          <div className="user-table">
            {userData.map((user, index) => (
              <div key={index} className="user-row">
                <div className="user-cell">{user.name}</div>
                <div className="user-cell">{user.role}</div>
                <div className="user-cell">{user.permissions}</div>
                <div className={`user-status ${user.status.toLowerCase()}`}>
                  {user.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <QuickActions />
        </div>
      </div>

      <ActivityLog userData={userData} />
    </div>
  );
}

export default Dashboard;
