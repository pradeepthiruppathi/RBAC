import React, { useState } from 'react';
import '../styles/CreateUserForm.css'; // Update path accordingly

function CreateUserForm({ closeForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const availablePermissions = ['Read', 'Write', 'Delete'];

  const handlePermissionChange = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, permissions, status: 'Active' };
    console.log('Creating new user:', newUser);

    // Call closeForm to close the form after submission
    if (closeForm) {
      closeForm();
    } else {
      console.error('closeForm is not defined');
    }
  };

  return (
    <div className="create-user-form-container">
      <h3 className="create-user-form-header">Create User</h3>
      <form onSubmit={handleSubmit}>
        <div className="create-user-form-group">
          <label className="create-user-form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user's name"
            className="create-user-form-input"
            required
          />
        </div>
        <div className="create-user-form-group">
          <label className="create-user-form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user's email"
            className="create-user-form-input"
            required
          />
        </div>
        <div className="create-user-form-group">
          <label className="create-user-form-label">Permissions:</label>
          <div className="create-user-form-dropdown-container">
            <div
              className="create-user-form-dropdown-header"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {permissions.length > 0 ? permissions.join(', ') : 'Select Permissions'}
            </div>
            {showDropdown && (
              <div className="create-user-form-dropdown-options">
                {availablePermissions.map((permission) => (
                  <label key={permission} className="create-user-form-dropdown-option">
                    <input
                      type="checkbox"
                      className="create-user-form-checkbox"
                      checked={permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    {permission}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="create-user-form-buttons">
          <button
            type="submit"
            className="create-user-form-submit-btn"
          >
            Create
          </button>
          <button
            type="button"
            className="create-user-form-cancel-btn"
            onClick={closeForm} // Close the form when Cancel is clicked
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
