// CreatePermissionForm.js
import React, { useState } from 'react';

const CreatePermissionForm = ({ onSave, onCancel }) => {
  const [permission, setPermission] = useState({
    role: "",
    read: false,
    write: false,
    delete: false,
    create: false,
    publish: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPermission({
      ...permission,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(permission);
  };

  return (
    <div className="create-permission-form">
      <h3>Create Permission</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={permission.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Read:</label>
          <input
            type="checkbox"
            name="read"
            checked={permission.read}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Write:</label>
          <input
            type="checkbox"
            name="write"
            checked={permission.write}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Delete:</label>
          <input
            type="checkbox"
            name="delete"
            checked={permission.delete}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Create:</label>
          <input
            type="checkbox"
            name="create"
            checked={permission.create}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Publish:</label>
          <input
            type="checkbox"
            name="publish"
            checked={permission.publish}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePermissionForm;
