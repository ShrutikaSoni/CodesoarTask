import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { mockAPI } from '../../services/mockAPI';
import './auth.css';

export const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await mockAPI.register(formData);
      onRegister(result);
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
          <UserPlus className="auth-icon" />
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join Spam Detector today</p>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            className="form-input"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone Number *
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
          <label className="form-label" htmlFor="email">
            Email Address (Optional)
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your email address"
            autoComplete="email"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password *
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Create a password (min. 6 characters)"
            autoComplete="new-password"
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
              <UserPlus size={16} />
              Create Account
            </>
          )}
        </button>
        
        <div className="auth-switch">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="link-button"
          >
            Already have an account? Sign in here
          </button>
        </div>
      </form>
    </div>
  );
};