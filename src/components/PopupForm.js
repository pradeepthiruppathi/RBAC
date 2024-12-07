import React, { useState } from 'react';
import '../styles/PopupForm.css'; // Ensure styles are unique to this component

function PopupForm({ mode, currentRole, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: currentRole?.name || '',
    description: currentRole?.description || '',
    permissions: currentRole?.permissions || '',
    type: currentRole?.type || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: currentRole?.id || null });
  };

  return (
    <div className="popup-form-overlay">
      <div className="popup-form-container">
        <h3>{mode === 'create' ? 'Create Role' : 'Edit Role'}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Role Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Role Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Permissions:
            <input
              type="text"
              name="permissions"
              value={formData.permissions}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Type of Role:
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </label>
          <div className="popup-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
