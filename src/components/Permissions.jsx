import React, { useState } from "react";
import "../styles/permissions.css";
import ActionButtons from "./ActionButtons";
import PermissionsTabs from "./PermissionsTabs";

const Permissions = () => {
  const [activeTab, setActiveTab] = useState("User Permissions");
  const [permissions, setPermissions] = useState([
    { role: "Super Admin", read: true, write: true, delete: true, create: true, publish: true },
    { role: "Admin", read: true, write: true, delete: false, create: false, publish: false },
    { role: "Editor", read: true, write: true, delete: false, create: true, publish: true },
    { role: "Viewer", read: true, write: false, delete: false, create: false, publish: false },
  ]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);

  // Handle the creation of a new permission
  const handleCreatePermission = () => {
    setEditMode(false); // Reset to create mode
    setCurrentPermission({ role: "", read: false, write: false, delete: false, create: false, publish: false }); // Default new permission
    setFormVisible(true); // Show the form
  };

  // Handle editing an existing permission
  const handleEditPermission = (permission) => {
    setEditMode(true); // Set to edit mode
    setCurrentPermission(permission); // Set the current permission to be edited
    setFormVisible(true); // Show the form
  };

  // Handle deletion of a permission
  const handleDeletePermission = (permission) => {
    const updatedPermissions = permissions.filter((p) => p !== permission); // Remove the permission from the list
    setPermissions(updatedPermissions); // Update the state with the new list of permissions
  };

  // Handle checkbox change for permissions (Read, Write, Delete, etc.)
  const handleCheckboxChange = (e, permissionField) => {
    const updatedPermission = { ...currentPermission, [permissionField]: e.target.checked };
    setCurrentPermission(updatedPermission); // Update the permission object with the new checkbox state
  };

  // Handle saving the permission (both for create and edit)
  const handleSavePermission = () => {
    if (isEditMode) {
      const updatedPermissions = permissions.map((p) =>
        p === currentPermission ? currentPermission : p
      );
      setPermissions(updatedPermissions); // Update the permissions state
    } else {
      setPermissions([...permissions, currentPermission]); // Add to permissions state
    }
    setFormVisible(false); // Close the form after saving
  };

  // Handle cancel action
  const handleCancel = () => {
    setFormVisible(false); // Close the form without saving
    setCurrentPermission(null); // Reset current permission
  };

  return (
    <div className="rbac-container">
      {/* Action Buttons */}
      <ActionButtons
        onCreate={handleCreatePermission} // Trigger the create form
        onEdit={() => {}} // Edit action (can be expanded later)
        onDelete={() => {}} // Delete action (can be expanded later)
      />

      {/* Permissions Tabs */}
      <PermissionsTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)} // Handle tab change
        permissions={permissions}
        onEdit={handleEditPermission} // Handle edit action on the tab
        onDelete={handleDeletePermission} // Handle delete action on the tab
      />

      {/* Permission Form Popup */}
      {isFormVisible && (
        <div className="permission-form-popup">
          <div className="permission-form-content">
            <h3>{isEditMode ? "Edit Permission" : "Create Permission"}</h3>

            {/* Permissions Table */}
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Read</th>
                  <th>Write</th>
                  <th>Delete</th>
                  <th>Create</th>
                  <th>Publish</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      value={currentPermission.role}
                      onChange={(e) => setCurrentPermission({ ...currentPermission, role: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={currentPermission.read}
                      onChange={(e) => handleCheckboxChange(e, "read")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={currentPermission.write}
                      onChange={(e) => handleCheckboxChange(e, "write")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={currentPermission.delete}
                      onChange={(e) => handleCheckboxChange(e, "delete")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={currentPermission.create}
                      onChange={(e) => handleCheckboxChange(e, "create")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={currentPermission.publish}
                      onChange={(e) => handleCheckboxChange(e, "publish")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Save and Cancel Buttons */}
            <div className="permission-actions">
              <button onClick={handleSavePermission}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
