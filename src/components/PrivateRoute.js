import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('userToken'); // Check if user is logged in

  return isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute;
