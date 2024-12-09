import React, { useState } from 'react';
import PropTypes from 'prop-types'; // For type-checking props
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaLock, FaSignOutAlt } from 'react-icons/fa';

function Navbar({ onLogout = () => {} }) {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // For navigation after logout confirmation

  // Show logout confirmation modal
  const handleLogoutClick = () => {
    setShowModal(true);
  };

  // Confirm logout action
  const confirmLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout(); // Trigger the logout function if provided
    }
    setShowModal(false); // Close the modal
    navigate('/logout'); // Redirect to the logout page
  };

  // Cancel logout action
  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">
          <h1>DASHBOARD</h1>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/users">
          <FaUser /> &nbsp;Users
        </Link>
        <Link to="/roles">
          <FaCog /> &nbsp;Roles
        </Link>
        <Link to="/permissions">
          <FaLock /> &nbsp;Permissions
        </Link>
      </div>

      <div className="navbar-actions">
        <button onClick={handleLogoutClick} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Are you sure you want to log out?</h3>
            <div className="modal-actions">
              <button onClick={confirmLogout} className="confirm-button">
                Yes
              </button>
              <button onClick={cancelLogout} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Prop type validation for Navbar
Navbar.propTypes = {
  onLogout: PropTypes.func, // Function to handle logout
};

export default Navbar;
