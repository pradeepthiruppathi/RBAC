import React, { useState } from "react";
import "../styles/permissions.css";
import ActionButtons from "./ActionButtons";
import PermissionsTabs from "./PermissionsTabs";
import PermissionForm from "./PermissionForm";

const Permissions = () => {
  const [activeTab, setActiveTab] = useState("User Permissions");
  const [permissions, setPermissions] = useState([
    { role: "Super Admin", read: true, write: true, delete: true, create: true, publish: true },
    { role: "Admin", read: true, write: true, delete: false, create: false, publish: false },
  ]);
  const [customPermissions, setCustomPermissions] = useState([
    { name: "Create", enabled: true },
    { name: "Update", enabled: false },
    { name: "Publish", enabled: true },
  ]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);

  // Handle the creation of a new permission
  const handleCreatePermission = () => {
    setEditMode(false); // Reset to create mode
    setCurrentPermission({
      role: "",
      read: false,
      write: false,
      delete: false,
      create: false,
      publish: false,
    }); // Default new permission
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
    setPermissions(permissions.filter((p) => p !== permission)); // Delete from User Permissions
    setCustomPermissions(customPermissions.filter((p) => p !== permission)); // Delete from Additional Permissions
  };

  // Handle saving the permission (both for create and edit)
  const handleSavePermission = (newPermission) => {
    if (isEditMode) {
      const updatedPermissions = permissions.map((p) =>
        p === currentPermission ? newPermission : p
      );
      setPermissions(updatedPermissions); // Update the permissions state
    } else {
      setPermissions([...permissions, newPermission]); // Add to permissions state
    }
    setFormVisible(false); // Close the form after saving
  };

  return (
    <div className="rbac-container">
      <ActionButtons
        onCreate={handleCreatePermission} // Trigger the create form
        onEdit={() => {}} // Edit action (can be expanded later)
        onDelete={() => {}} // Delete action (can be expanded later)
      />
      <PermissionsTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)} // Handle tab change
        permissions={permissions}
        customPermissions={customPermissions}
        onEdit={handleEditPermission} // Handle edit action on the tab
        onDelete={handleDeletePermission} // Handle delete action on the tab
      />
      {isFormVisible && (
        <PermissionForm
          permission={currentPermission} // Pass current permission for editing or empty for creation
          onSave={handleSavePermission} // Handle save of permission (create or edit)
          onCancel={() => setFormVisible(false)} // Cancel and close the form
          isEdit={isEditMode} // Pass edit mode status
        />
      )}
    </div>
  );
};

export default Permissions;
