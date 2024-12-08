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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [searchTerm, setSearchTerm] = useState(''); // Track the search term
  const [data, setData] = useState(null); // State for holding data from API

  // Fetch data from API
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.example.com/data'); // Replace with your actual API URL
          const result = await response.json();
          setData(result); // Store the API result in the state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn]); // Runs only when login status changes

  const handleLogin = () => {
    setIsLoggedIn(true); // Set to true when login is successful
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set to false when logout occurs
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term globally
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
              <Dashboard searchTerm={searchTerm} data={data} /> {/* Pass API data to Dashboard */}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/users"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              <Users searchTerm={searchTerm} data={data} /> {/* Pass API data to Users */}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/permissions"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              <Permissions searchTerm={searchTerm} data={data} /> {/* Pass API data to Permissions */}
            </Layout>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/roles"
          element={isLoggedIn ? (
            <Layout onLogout={handleLogout} onSearch={handleSearch}>
              <Roles searchTerm={searchTerm} data={data} /> {/* Pass API data to Roles */}
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
