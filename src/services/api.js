// api.js
export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Doe', role: 'Viewer', status: 'Active' },
        { id: 2, name: 'David Bell', role: 'Editor', status: 'Active' },
      ]);
    }, 500);
  });
};

export const createUser = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Here, we're simulating a successful creation by returning the new user with an ID.
      resolve({ ...newUser, id: Date.now() });
    }, 500);
  });
};

export const updateUser = (updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(updatedUser);
    }, 500);
  });
};

export const deleteUser = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userId);
    }, 500);
  });
};
