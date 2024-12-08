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
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.example.com/data'); 
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load data');
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isLoggedIn]);

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
    if (error) return <div>{error}</div>;
    return null;
  };

  return (
    <Router basename="/RBAC">
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
