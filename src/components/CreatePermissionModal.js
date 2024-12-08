import React, { useState } from "react";
import "../styles/permissions.css"; // Import the custom CSS for the modal styling

const CreatePermissionModal = ({ onSave, onCancel }) => {
  const [permission, setPermission] = useState({
    role: "",
    read: false,
    write: false,
    delete: false,
    create: false,
    publish: false,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPermission({
      ...permission,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (permission.role) {
      onSave(permission); // Pass data back to parent
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create Permission</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={permission.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="checkbox-group">
            <label>Permissions:</label>
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
          </div>
          <div className="button-group">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePermissionModal;
