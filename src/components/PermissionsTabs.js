import React from "react";
import { FaUserShield, FaDatabase, FaTools } from "react-icons/fa";
import PermissionsTable from "./PermissionsTable";

const PermissionsTabs = ({
  activeTab,
  onTabChange,
  permissions,
  customPermissions,
  onEdit,
  onDelete,
  onCheckboxChange, // Added onCheckboxChange as a prop
}) => {
  return (
    <div className="rbac-tabs-container">
      {/* Tabs */}
      <div className="rbac-tabs">
        {/* User Permissions Tab */}
        <button
          className={activeTab === "User Permissions" ? "rbac-active-tab" : ""}
          onClick={() => onTabChange("User Permissions")}
        >
          <FaUserShield className="rbac-tab-icon" />
          User Permissions
        </button>

        {/* Data Permissions Tab */}
        <button
          className={activeTab === "Data Permissions" ? "rbac-active-tab" : ""}
          onClick={() => onTabChange("Data Permissions")}
        >
          <FaDatabase className="rbac-tab-icon" />
          Data Permissions
        </button>

        {/* Additional Permissions Tab */}
        <button
          className={activeTab === "Additional Permissions" ? "rbac-active-tab" : ""}
          onClick={() => onTabChange("Additional Permissions")}
        >
          <FaTools className="rbac-tab-icon" />
          Additional Permissions
        </button>
      </div>

      {/* Tab Content */}
      <div className="rbac-permissions-content">
        {/* Only render the table for the active tab */}
        {activeTab === "User Permissions" && permissions && (
          <PermissionsTable
            permissions={permissions} // User Permissions data
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckboxChange={onCheckboxChange} // Pass down onCheckboxChange
            tab="User Permissions"
          />
        )}

        {activeTab === "Data Permissions" && permissions && (
          <PermissionsTable
            permissions={permissions} // Data Permissions data
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckboxChange={onCheckboxChange} // Pass down onCheckboxChange
            tab="Data Permissions"
          />
        )}

        {activeTab === "Additional Permissions" && customPermissions && (
          <PermissionsTable
            permissions={customPermissions} // Custom Permissions data
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckboxChange={onCheckboxChange} // Pass down onCheckboxChange
            tab="Additional Permissions"
          />
        )}
      </div>
    </div>
  );
};

export default PermissionsTabs;
