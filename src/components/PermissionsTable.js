import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const PermissionsTable = ({ permissions, onEdit, onDelete, tab }) => {
  return (
    <table className="rbac-permissions-table">
      <thead>
        <tr>
          <th>{tab === "Additional Permissions" ? "Permission Name" : "Role Name"}</th>
          {tab !== "Additional Permissions" && (
            <>
              <th>Read</th>
              <th>Write</th>
              <th>Delete</th>
              <th>Create</th>
              <th>Publish</th>
            </>
          )}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {permissions.map((permission, index) => (
          <tr key={index}>
            <td>{permission.name || permission.role}</td>
            {tab !== "Additional Permissions" && (
              <>
                <td><input type="checkbox" checked={permission.read} readOnly /></td>
                <td><input type="checkbox" checked={permission.write} readOnly /></td>
                <td><input type="checkbox" checked={permission.delete} readOnly /></td>
                <td><input type="checkbox" checked={permission.create} readOnly /></td>
                <td><input type="checkbox" checked={permission.publish} readOnly /></td>
              </>
            )}
            <td>
              <button className="rbac-edit-btn" onClick={() => onEdit(permission, tab)}>
                <FaRegEdit />
              </button>
              <button className="rbac-delete-btn" onClick={() => onDelete(permission, tab)}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PermissionsTable;
