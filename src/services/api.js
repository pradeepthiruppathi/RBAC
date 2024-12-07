// Mock API service
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
  
  // Add more API functions as needed for users, roles, permissions, etc.
  