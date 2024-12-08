import React, { useState, useEffect } from 'react';

function CreateUserForm({ roles = [], onCreateUser, closeForm }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState(''); // Start with an empty string
  const [permissions, setPermissions] = useState([]);
  const [status, setStatus] = useState('active'); // Default status

  const availablePermissions = ['Create', 'Read', 'Update', 'Delete'];

  // Ensure that roles are available before setting the role state
  useEffect(() => {
    if (roles.length > 0) {
      setRole(roles[0]); // Default to the first role if roles exist
    }
  }, [roles]);

  const handlePermissionChange = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) {
      alert('Please fill out all required fields.');
      return;
    }
    const newUser = {
      name,
      role,
      permissions,
      status,
    };
    onCreateUser(newUser); // Pass new user data to the parent component
    closeForm(); // Close the form after submission
  };

  return (
    <div className="create-user-form">
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={roles.length === 0} // Disable if no roles are available
          >
            {roles.length > 0 ? (
              roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))
            ) : (
              <option>No roles available</option>
            )}
          </select>
        </div>

        {/* Permissions Checkbox */}
        <div className="form-group">
          <label>Permissions:</label>
          <div className="permissions-container">
            {availablePermissions.map((permission) => (
              <label key={permission}>
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                {permission}
              </label>
            ))}
          </div>
        </div>

        {/* Status Selection */}
        <div className="form-group">
          <label>Status:</label>
          <div>
            <label>
              <input
                type="radio"
                value="active"
                checked={status === 'active'}
                onChange={() => setStatus('active')}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="inactive"
                checked={status === 'inactive'}
                onChange={() => setStatus('inactive')}
              />
              Inactive
            </label>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
