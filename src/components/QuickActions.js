import React from 'react'; 
import '../styles/quickActions.css'; // Import custom CSS for quick actions
import { useNavigate } from 'react-router-dom'; // For navigation
import { FaUserPlus, FaEdit, FaKey } from 'react-icons/fa'; // Icons

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="qa-container">
      <h1 style={{color:"white"}}>Quick Actions</h1>
      <button className="qa-action-button" onClick={() => navigate('/users')}>
        <FaUserPlus className="qa-action-icon" />
        Create User
      </button>
      <button className="qa-action-button" onClick={() => navigate('/roles')}>
        <FaEdit className="qa-action-icon" />
        Edit Roles
      </button>
      <button className="qa-action-button" onClick={() => navigate('/permissions')}>
        <FaKey className="qa-action-icon" />
        Modify Permissions
      </button>
    </div>
  );
}

export default QuickActions;
