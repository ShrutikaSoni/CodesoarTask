import React from 'react';
import './common.css';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      <div className="loading-spinner__circle"></div>
    </div>
  );
};