import React, { useState } from 'react';
import { FaPlusCircle, FaSearch, FaFileExport, FaEye, FaQuestionCircle, FaEdit, FaTrash } from 'react-icons/fa';
import PopupForm from './PopupForm';
import userRoleImage from '../Assets/user-role-image.png'; // Assuming you have an image for the user role
import Permissions from './Permissions'; // Assuming you have a Permissions component

function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', description: 'Full control over all systems and users.', permissions: ['Read', 'Write', 'Delete', 'Create'], type: 'System' },
    { id: 2, name: 'Admin', description: 'Can manage users and moderate content.', permissions: ['Read', 'Write'], type: 'Server' },
    { id: 3, name: 'Editor', description: 'Can edit content and manage posts.', permissions: ['Write', 'Edit'], type: 'Content' },
    { id: 4, name: 'Viewer', description: 'Can only view content.', permissions: ['Read'], type: 'User' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentRole, setCurrentRole] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false); // State to control Help Modal visibility

  const handleExport = () => {
    const csvContent = roles.map((role) =>
      `${role.name},${role.description},${role.permissions.join(', ')},${role.type}`
    ).join('\n');
    const blob = new Blob([`Role Name,Role Description,Permissions,Type\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roles.csv';
    link.click();
  };

  const handleSearch = () => {
    alert('Search functionality coming soon!');
  };

  const handleHelp = () => {
    setShowHelpModal(true); // Show the Help Modal when clicked
  };

  const handleCloseHelpModal = () => {
    setShowHelpModal(false); // Close the Help Modal
  };

  const handlePermissionToggle = (roleId, permission) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, permissions: role.permissions.includes(permission) 
            ? role.permissions.filter(p => p !== permission) 
            : [...role.permissions, permission] } 
        : role
    ));
  };

  return (
    <div className="roles-page-container">
      <div className="roles-button-container">
        <button
          className="roles-action-button roles-create-role"
          onClick={() => {
            setFormMode('create');
            setShowForm(true);
          }}
        >
          <FaPlusCircle /> Create Role
        </button>
        <button
          className="roles-action-button roles-view-role"
          onClick={() => setShowTable(!showTable)}
        >
          <FaEye /> {showTable ? 'Hide Roles' : 'View Roles'}
        </button>
        <button className="roles-action-button roles-export-role" onClick={handleExport}>
          <FaFileExport /> Export Roles
        </button>
        <button className="roles-action-button roles-search-role" onClick={handleSearch}>
          <FaSearch /> Search Roles
        </button>
        <button className="roles-action-button roles-help-role" onClick={handleHelp}>
          <FaQuestionCircle /> Help
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <PopupForm
          mode={formMode}
          currentRole={currentRole}
          onClose={() => setShowForm(false)}
          onSubmit={(role) => {
            setRoles([...roles, { ...role, id: roles.length + 1 }]);
            setShowForm(false);
          }}
        />
      )}

      {/* Roles Table */}
      {showTable && (
        <div className="roles-table-container">
          <table>
            <thead>
              <tr className="roles-table-header">
                <th>Role Name</th>
                <th>Role Description</th>
                <th>Permissions</th>
                <th>Type of Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="roles-table-row">
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td className="roles-permissions">
                    {['Dashboard', 'Write', 'Read', 'Delete'].map(permission => (
                      <label key={permission} className="permission-label">
                        <input
                          type="checkbox"
                          checked={role.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(role.id, permission)}
                          className="permission-checkbox"
                        />
                        <span className={`permission-button ${role.permissions.includes(permission) ? 'active' : ''}`}>
                          {permission}
                        </span>
                      </label>
                    ))}
                  </td>
                  <td>{role.type}</td>
                  <td className="roles-action-icons">
                    <button
                      onClick={() => {
                        setCurrentRole(role);
                        setFormMode('edit');
                        setShowForm(true);
                      }}
                    >
                      <FaEdit /> {/* Edit Icon */}
                    </button>
                    <button
                      onClick={() =>
                        setRoles(roles.filter((r) => r.id !== role.id))
                      }
                    >
                      <FaTrash /> {/* Trash Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Section (Last Element) */}
      <div className="roles-image-section">
        <div className="roles-image-container">
          <img src={userRoleImage} alt="User Role" />
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="help-modal-overlay">
          <div className="help-modal">
            <h2>Help Guide</h2>
            <p><strong>Roles:</strong> Roles determine the level of access a user has within the system.</p>
            <p><strong>Permissions:</strong> Permissions define the actions a user can perform in the system. These include Read, Write, Create, and Delete permissions.</p>
            <p><strong>Actions:</strong> Use the buttons to add, edit, delete, or export roles. Click on a role to edit its permissions and details.</p>
            <button onClick={handleCloseHelpModal} className="help-modal-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;
