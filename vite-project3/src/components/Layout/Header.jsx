// src/components/Layout/Header.jsx
import React from 'react';
import { Shield, LogOut, User } from 'lucide-react';
import './layout.css';

export const Header = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <Shield className="brand-icon" />
          <h1 className="brand-title">Spam Detector</h1>
        </div>
        
        {user && (
          <div className="header-user">
            <div className="user-info">
              <User className="user-icon" />
              <span className="user-name">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="logout-btn"
              title="Sign Out"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};