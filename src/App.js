import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true'); // Check login status in localStorage
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null); // State for holding data from API
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  // Fetch data from API when logged in
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.example.com/data'); // Replace with your actual API URL
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
  }, [isLoggedIn]); // Runs only when login status changes

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
  };

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Loading or error message display
  const renderLoadingOrError = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return null;
  };

  return (
    <Router>
      <Routes>
        {/* LoginPage route, redirects to home if logged in */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} 
        />

        {/* Home page route */}
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} 
        />
        
        {/* Protected Routes wrapped with Layout */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Dashboard searchTerm={searchTerm} data={data} />} {/* Pass API data to Dashboard */}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/users"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Users searchTerm={searchTerm} data={data} />} {/* Pass API data to Users */}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/permissions"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Permissions searchTerm={searchTerm} data={data} />} {/* Pass API data to Permissions */}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/roles"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              {renderLoadingOrError() || <Roles searchTerm={searchTerm} data={data} />} {/* Pass API data to Roles */}
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
