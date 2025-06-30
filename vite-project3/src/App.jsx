// src/App.jsx
import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Header } from './components/Layout/Header';
import { SearchInterface } from './components/Search/SearchInterface';
import './components/styles/globals.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored authentication on app load
  useEffect(() => {
    const storedUser = sessionStorage.getItem('spamDetectorUser');
    const storedToken = sessionStorage.getItem('spamDetectorToken');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid stored data
        sessionStorage.removeItem('spamDetectorUser');
        sessionStorage.removeItem('spamDetectorToken');
      }
    }
  }, []);

  const handleLogin = (authData) => {
    const { user: userData, token } = authData;
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store authentication data in sessionStorage
    sessionStorage.setItem('spamDetectorUser', JSON.stringify(userData));
    sessionStorage.setItem('spamDetectorToken', token);
  };

  const handleRegister = (authData) => {
    const { user: userData, token } = authData;
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store authentication data in sessionStorage
    sessionStorage.setItem('spamDetectorUser', JSON.stringify(userData));
    sessionStorage.setItem('spamDetectorToken', token);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear stored authentication data
    sessionStorage.removeItem('spamDetectorUser');
    sessionStorage.removeItem('spamDetectorToken');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleReportSpam = (phoneNumber) => {
    console.log(`Spam reported for phone number: ${phoneNumber}`);
    // You can add additional logic here like showing a success message
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <div className="auth-layout">
          {currentView === 'login' ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={handleSwitchToRegister}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <main className="app-main">
        <div className="container">
          <SearchInterface onReportSpam={handleReportSpam} />
        </div>
      </main>
    </div>
  );
}

export default App;