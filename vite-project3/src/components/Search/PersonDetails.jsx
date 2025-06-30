// src/components/Search/PersonDetails.jsx
import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, AlertTriangle, CheckCircle, Flag } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { SpamIndicator } from '../Common/SpamIndicator';
import { mockAPI } from '../../services/mockAPI';
import './search.css';

export const PersonDetails = ({ person, onClose, onReportSpam }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      
      try {
        const detailedInfo = await mockAPI.getPersonDetails(person.id);
        setDetails(detailedInfo);
      } catch (err) {
        setError('Failed to load person details');
        console.error('Details fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [person.id]);

  const handleReportSpam = async () => {
    setReporting(true);
    
    try {
      await mockAPI.reportSpam(person.phone);
      setReported(true);
      onReportSpam?.(person.phone);
      
      // Auto-close after successful report
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to report spam. Please try again.');
      console.error('Report spam error:', err);
    } finally {
      setReporting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getRiskDescription = (likelihood) => {
    if (likelihood < 0.3) {
      return "This number appears to be legitimate with low spam reports.";
    } else if (likelihood < 0.7) {
      return "This number has some spam reports. Use caution when answering.";
    } else {
      return "This number has high spam likelihood. Strongly recommend avoiding.";
    }
  };

  return (
    <div className="person-details-overlay" onClick={handleBackdropClick}>
      <div className="person-details-modal">
        <div className="person-details-header">
          <h3 className="person-details-title">Contact Details</h3>
          <button
            onClick={onClose}
            className="person-details-close"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="person-details-content">
          {loading ? (
            <div className="person-details-loading">
              <LoadingSpinner size="lg" />
              <p>Loading contact details...</p>
            </div>
          ) : error ? (
            <div className="person-details-error">
              <AlertTriangle size={24} />
              <p>{error}</p>
            </div>
          ) : details ? (
            <>
              <div className="person-details-info">
                <div className="person-details-field">
                  <div className="field-label">Name</div>
                  <div className="field-value">{details.name}</div>
                </div>

                <div className="person-details-field">
                  <div className="field-label">
                    <Phone size={16} />
                    Phone Number
                  </div>
                  <div className="field-value">{details.phone}</div>
                </div>

                {details.email && (
                  <div className="person-details-field">
                    <div className="field-label">
                      <Mail size={16} />
                      Email
                    </div>
                    <div className="field-value">{details.email}</div>
                  </div>
                )}

                <div className="person-details-field">
                  <div className="field-label">Registration Status</div>
                  <div className="field-value">
                    {details.isRegistered ? (
                      <span className="registration-status registration-status--registered">
                        <CheckCircle size={16} />
                        Registered User
                      </span>
                    ) : (
                      <span className="registration-status registration-status--unregistered">
                        <AlertTriangle size={16} />
                        Not Registered
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="spam-assessment">
                <div className="spam-assessment-header">
                  <h4>Spam Assessment</h4>
                  <SpamIndicator 
                    likelihood={details.spamLikelihood} 
                    showPercentage={true} 
                  />
                </div>
                <p className="spam-description">
                  {getRiskDescription(details.spamLikelihood)}
                </p>
              </div>

              <div className="person-details-actions">
                {reported ? (
                  <div className="report-success">
                    <CheckCircle size={16} />
                    Thank you for reporting this number!
                  </div>
                ) : (
                  <button
                    onClick={handleReportSpam}
                    disabled={reporting}
                    className="btn btn--danger report-spam-btn"
                  >
                    {reporting ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Flag size={16} />
                        Report as Spam
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};