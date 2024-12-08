import React from 'react';

const PermissionForm = ({ permission, onSave, onCancel, isEdit, onCheckboxChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(permission); // Save permission (either create or edit)
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEdit ? "Edit Permission" : "Create Permission"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Role:
              <input
                type="text"
                value={permission.role}
                onChange={(e) => (permission.role = e.target.value)} // Simple text input for role
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={permission.read}
                onChange={(e) => onCheckboxChange(e, 'read')} // Update read permission
              />
              Read
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={permission.write}
                onChange={(e) => onCheckboxChange(e, 'write')} // Update write permission
              />
              Write
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={permission.delete}
                onChange={(e) => onCheckboxChange(e, 'delete')} // Update delete permission
              />
              Delete
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={permission.create}
                onChange={(e) => onCheckboxChange(e, 'create')} // Update create permission
              />
              Create
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={permission.publish}
                onChange={(e) => onCheckboxChange(e, 'publish')} // Update publish permission
              />
              Publish
            </label>
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionForm;
