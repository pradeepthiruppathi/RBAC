import React, { useState } from 'react';
import PropTypes from 'prop-types'; // For type-checking props
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaLock, FaSignOutAlt, FaSearch } from 'react-icons/fa';

function Navbar({ onLogout = () => {}, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // To navigate after logout confirmation

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as the user types
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Trigger the search function if provided
    }
  };

  const handleLogoutClick = () => {
    setShowModal(true); // Show the logout confirmation modal
  };

  const confirmLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout(); // Trigger the logout function if provided
    }
    setShowModal(false); // Close the modal
    navigate('/logout'); // Redirect to the logout page
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal if the user cancels
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">
          <h1>DASHBOARD</h1>
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
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
            <button onClick={confirmLogout}>Yes</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Prop type validation for Navbar
Navbar.propTypes = {
  onLogout: PropTypes.func, // Function to handle logout (default provided if not passed)
  onSearch: PropTypes.func, // Function to handle search
};

export default Navbar;
