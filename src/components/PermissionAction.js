import React from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";

const ActionButtons = ({ onCreate, onEdit, onDelete }) => {
  return (
    <div className="action-buttons-container">
      <button className="action-button create-button" onClick={onCreate}>
        <FaPlusCircle /> Create Permission
      </button>
      <button className="action-button edit-button" onClick={onEdit}>
        <FaEdit /> Edit Permission
      </button>
      <button className="action-button delete-button" onClick={onDelete}>
        <FaTrash /> Delete Permission
      </button>
    </div>
  );
};

export default ActionButtons;
