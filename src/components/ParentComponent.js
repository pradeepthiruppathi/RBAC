import React, { useState } from 'react';
import CreateUserForm from './CreateUserForm'; // Adjust the import path accordingly

function ParentComponent() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to hide the form (close it)
  const closeForm = () => {
    setIsFormVisible(false); // This will hide the form when called
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(true)}>Open Create User Form</button>
      {isFormVisible && <CreateUserForm closeForm={closeForm} />}
    </div>
  );
}

export default ParentComponent;
