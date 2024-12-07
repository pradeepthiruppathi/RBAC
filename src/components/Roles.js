import React, { useState } from 'react';
import { FaPlusCircle, FaSearch, FaFileExport, FaEye, FaQuestionCircle, FaEdit, FaTrash } from 'react-icons/fa';
import PopupForm from './PopupForm';
import userRoleImage from '../Assets/user-role-image.png';

function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', description: 'Full control over all systems and users.', permissions: 'Read, Write, Delete, Manage', type: 'System' },
    { id: 2, name: 'Admin', description: 'Can manage users and moderate content.', permissions: 'Read, Write', type: 'Server' },
    { id: 3, name: 'Editor', description: 'Can edit content and manage posts.', permissions: 'Write, Edit', type: 'Content' },
    { id: 4, name: 'Viewer', description: 'Can only view content.', permissions: 'Read', type: 'User' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentRole, setCurrentRole] = useState(null);
  const [showTable, setShowTable] = useState(true);

  const handleExport = () => {
    const csvContent = roles.map((role) =>
      `${role.name},${role.description},${role.permissions},${role.type}`
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
    alert('Here you can manage roles, permissions, and more!');
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
                  <td>{role.permissions}</td>
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
                      <FaTrash /> {/* Delete Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Section */}
      <div className="roles-image-section">
        <div className="roles-image-container">
          <img src={userRoleImage} alt="User Role" />
        </div>
      </div>
    </div>
  );
}

export default Roles;
