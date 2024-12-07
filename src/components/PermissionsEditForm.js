import React, { useState, useEffect } from "react";

const PermissionsEditForm = ({ permission, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    permissions: {
      read: false,
      write: false,
      delete: false,
      create: false,
      publish: false,
    },
  });

  // Pre-fill form data when permission is passed
  useEffect(() => {
    if (permission) {
      setFormData({
        name: permission.name,
        role: permission.role,
        permissions: permission.permissions,
      });
    }
  }, [permission]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Trigger save with updated data
  };

  return (
    <form onSubmit={handleSubmit} className="rbac-edit-form">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Permissions</label>
        <div>
          <label>Read</label>
          <input
            type="checkbox"
            name="read"
            checked={formData.permissions.read}
            onChange={handleChange}
          />
          <label>Write</label>
          <input
            type="checkbox"
            name="write"
            checked={formData.permissions.write}
            onChange={handleChange}
          />
          <label>Delete</label>
          <input
            type="checkbox"
            name="delete"
            checked={formData.permissions.delete}
            onChange={handleChange}
          />
          <label>Create</label>
          <input
            type="checkbox"
            name="create"
            checked={formData.permissions.create}
            onChange={handleChange}
          />
          <label>Publish</label>
          <input
            type="checkbox"
            name="publish"
            checked={formData.permissions.publish}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PermissionsEditForm;
