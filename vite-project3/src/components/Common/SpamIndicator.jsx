import React from 'react';
import './common.css';

export const SpamIndicator = ({ likelihood, showPercentage = true }) => {
  const getRiskLevel = () => {
    if (likelihood < 0.3) return 'low';
    if (likelihood < 0.7) return 'medium';
    return 'high';
  };
  
  const getLabel = () => {
    if (likelihood < 0.3) return 'Low Risk';
    if (likelihood < 0.7) return 'Medium Risk';
    return 'High Risk';
  };
  
  const riskLevel = getRiskLevel();
  const percentage = Math.round(likelihood * 100);
  
  return (
    <span className={`spam-indicator spam-indicator--${riskLevel}`}>
      {getLabel()}
      {showPercentage && ` (${percentage}%)`}
    </span>
  );
};