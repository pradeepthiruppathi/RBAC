import React from "react";
import { FaPlusCircle, FaRegEdit, FaTrashAlt } from "react-icons/fa";

const ActionButtons = ({ onCreate, onEdit, onDelete }) => {
  return (
    <div className="rbac-actions">
      <button onClick={onCreate} className="rbac-create-btn">
        <FaPlusCircle className="rbac-btn-icon" /> Create Permissions
      </button>
      <button onClick={onEdit} className="rbac-edit-btn">
        <FaRegEdit className="rbac-btn-icon" /> Edit Permissions
      </button>
      <button onClick={onDelete} className="rbac-delete-btn">
        <FaTrashAlt className="rbac-btn-icon" /> Delete Permissions
      </button>
    </div>
  );
};

export default ActionButtons;
