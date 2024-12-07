import React from 'react';
import '../styles/statboxes.css'; // Importing custom CSS for styling

function StatBoxes({ totalUsers, activeUsers, permissionsCount }) {
  return (
    <div className="stat-boxes">
      <div className="stat-box">
        <img src={require('../Assets/all-users.png')} alt="All Users" className="stat-icon" />
        <div className="stat-content">
          <h3>All Users</h3><br />
          <h1 className="number">{totalUsers}</h1>
        </div>
      </div>
      <div className="stat-box">
        <img src={require('../Assets/active-users.png')} alt="Active Users" className="stat-icon" />
        <div className="stat-content">
          <h3>Active Users</h3><br />
          <h1 className="number">{activeUsers}</h1>
        </div>
      </div>
      <div className="stat-box">
        <img src={require('../Assets/permissions.png')} alt="Permissions" className="stat-icon" />
        <div className="stat-content">
          <h3>Permissions</h3><br />
          <h1 className="number">{permissionsCount}</h1>
        </div>
      </div>
    </div>
  );
}

export default StatBoxes;
