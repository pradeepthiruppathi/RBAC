import React from "react";
import { FaUserShield, FaDatabase, FaTools } from "react-icons/fa";
import PermissionsTable from "./PermissionsTable";

const PermissionsTabs = ({ activeTab, onTabChange, permissions, customPermissions, onEdit, onDelete }) => {
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
        {activeTab === "User Permissions" && (
          <PermissionsTable
            permissions={permissions}
            onEdit={onEdit}
            onDelete={onDelete}
            tab="User Permissions"
          />
        )}

        {activeTab === "Data Permissions" && (
          <PermissionsTable
            permissions={permissions} // Update with actual data for Data Permissions
            onEdit={onEdit}
            onDelete={onDelete}
            tab="Data Permissions"
          />
        )}

        {activeTab === "Additional Permissions" && (
          <PermissionsTable
            permissions={customPermissions}
            onEdit={onEdit}
            onDelete={onDelete}
            tab="Additional Permissions"
          />
        )}
      </div>
    </div>
  );
};

export default PermissionsTabs;
