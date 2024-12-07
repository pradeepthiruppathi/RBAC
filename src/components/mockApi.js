// mockApi.js
let permissionsData = [
  { id: 1, role: "Super Admin", read: true, write: true, delete: true, create: true, publish: true },
  { id: 2, role: "Admin", read: true, write: true, delete: false, create: false, publish: false },
];

const fetchPermissions = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(permissionsData), 500); // Simulate an API delay
  });
};

const createPermission = (newPermission) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = permissionsData.length + 1;
      const permission = { ...newPermission, id };
      permissionsData.push(permission);
      resolve(permission);
    }, 500);
  });
};

const updatePermission = (updatedPermission) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      permissionsData = permissionsData.map((p) =>
        p.id === updatedPermission.id ? updatedPermission : p
      );
      resolve(updatedPermission);
    }, 500);
  });
};

const deletePermission = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      permissionsData = permissionsData.filter((p) => p.id !== id);
      resolve(id);
    }, 500);
  });
};

export { fetchPermissions, createPermission, updatePermission, deletePermission };
