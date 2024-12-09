import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Permissions from './components/Permissions';
import Roles from './components/Roles';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './styles/dashboard.css';
import './styles/permissions.css';
import './styles/users.css';
import './styles/navbar.css';
import './styles/login.css';
import './styles/roles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null); // This will hold our example data
  const [loading, setLoading] = useState(false); // We will simulate loading

  // Example static data
  const exampleData = [
    { id: 1, name: 'User One', role: 'Admin', permission: 'Full Access' },
    { id: 2, name: 'User Two', role: 'Editor', permission: 'Limited Access' },
    { id: 3, name: 'User Three', role: 'Viewer', permission: 'View Only' },
    { id: 4, name: 'User Four', role: 'Admin', permission: 'Full Access' },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      // Simulate loading delay with setTimeout
      setTimeout(() => {
        setData(exampleData); // Set the static data after a delay
        setLoading(false);
      }, 1000);
    }
  }, [isLoggedIn]); // Empty dependency array, no need to track 'exampleData'

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const renderLoadingOrError = () => {
    if (loading) return <div>Loading...</div>;
    return null;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} 
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Dashboard searchTerm={searchTerm} data={data} />}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/users"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Users searchTerm={searchTerm} data={data} />}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/permissions"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Permissions searchTerm={searchTerm} data={data} />}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/roles"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Roles searchTerm={searchTerm} data={data} />}
            </Layout>
          ) : (
            <Navigate to="/" /> 
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
