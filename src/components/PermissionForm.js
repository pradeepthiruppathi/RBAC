import React, { useState, useEffect } from "react";

const PermissionForm = ({ permission = {}, onSave, onCancel, isEdit }) => {
  const [permissionName, setPermissionName] = useState(permission?.name || "");
  const [selectedRole, setSelectedRole] = useState(permission?.role || "");
  const [permissionActions, setPermissionActions] = useState(
    permission?.actions || {
      read: false,
      write: false,
      delete: false,
      create: false,
      publish: false,
    }
  );

  useEffect(() => {
    if (permission) {
      setPermissionName(permission.name);
      setSelectedRole(permission.role);
      setPermissionActions(permission.actions || permissionActions);
    }
  }, [permission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: permissionName, role: selectedRole, actions: permissionActions });
  };

  const handleCheckboxChange = (e, action) => {
    setPermissionActions((prevActions) => ({
      ...prevActions,
      [action]: e.target.checked,
    }));
  };

  return (
    <div className="rbac-form-container">
      <h3>{isEdit ? "Edit Permission" : "Create Permission"}</h3>
      <form onSubmit={handleSubmit}>
        {/* Role Dropdown for Create Permission */}
        {!isEdit && (
          <div className="rbac-form-group">
            <label>Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        )}

        {/* Permission Name Input */}
        <div className="rbac-form-group">
          <label>Permission Name</label>
          <input
            type="text"
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)}
            required
            disabled={isEdit} // Disable name input if in edit mode
          />
        </div>

        {/* Permission Actions (Checkboxes) */}
        <div className="rbac-form-group">
          <label>Permission Actions</label>
          <div>
            {["read", "write", "delete", "create", "publish"].map((action) => (
              <label key={action} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={permissionActions[action]}
                  onChange={(e) => handleCheckboxChange(e, action)}
                />
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rbac-form-actions">
          <button type="submit" className="rbac-save-btn">
            {isEdit ? "Update" : "Save"}
          </button>
          <button type="button" className="rbac-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PermissionForm;
