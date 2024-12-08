// PermissionsTable.js
import React from "react";

const PermissionsTable = ({ permissions, onCheckboxChange, onEdit, onDelete }) => {
  return (
    <div className="permissions-table">
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Read</th>
            <th>Write</th>
            <th>Delete</th>
            <th>Create</th>
            <th>Publish</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={index}>
              <td>{permission.role}</td>
              <td>
                <input
                  type="checkbox"
                  checked={permission.read}
                  onChange={(e) => onCheckboxChange(e, "read", permission)} // Pass the permission to the callback
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={permission.write}
                  onChange={(e) => onCheckboxChange(e, "write", permission)} // Pass the permission to the callback
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={permission.delete}
                  onChange={(e) => onCheckboxChange(e, "delete", permission)} // Pass the permission to the callback
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={permission.create}
                  onChange={(e) => onCheckboxChange(e, "create", permission)} // Pass the permission to the callback
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={permission.publish}
                  onChange={(e) => onCheckboxChange(e, "publish", permission)} // Pass the permission to the callback
                />
              </td>
              <td>
                <button onClick={() => onEdit(permission)}>Edit</button>
                <button onClick={() => onDelete(permission)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
