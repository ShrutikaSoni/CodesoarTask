// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { Shield, LogIn } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { mockAPI } from '../../services/mockAPI';
import './auth.css';

export const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await mockAPI.login(formData.phone, formData.password);
      onLogin(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-header">
          <Shield className="auth-icon" />
          <h2 className="auth-title">Spam Detector</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="btn btn--primary btn--full-width"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <LogIn size={16} />
              Sign In
            </>
          )}
        </button>
        
        <div className="auth-switch">
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="link-button"
          >
            Don't have an account? Register here
          </button>
        </div>
        
        <div className="demo-credentials">
          <strong>Demo credentials:</strong><br />
          Phone: 1234567890<br />
          Password: password
        </div>
      </form>
    </div>
  );
};