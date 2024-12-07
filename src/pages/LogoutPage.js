// components/Layout.js
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, onLogout, onSearch }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} onSearch={onSearch} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
