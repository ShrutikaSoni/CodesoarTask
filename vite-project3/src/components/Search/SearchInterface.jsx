// src/components/Search/SearchInterface.jsx
import React, { useState } from 'react';
import { Search, Phone, User, AlertTriangle } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { SpamIndicator } from '../Common/SpamIndicator';
import { PersonDetails } from './PersonDetails';
import { mockAPI } from '../../services/mockAPI';
import './search.css';

export const SearchInterface = ({ onReportSpam }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' or 'phone'
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      let searchResults;
      if (searchType === 'name') {
        searchResults = await mockAPI.searchByName(searchQuery.trim());
      } else {
        searchResults = await mockAPI.searchByPhone(searchQuery.trim());
      }
      
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        setError(`No results found for "${searchQuery}"`);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonClick = async (person) => {
    setSelectedPerson(person);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPerson(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const getSearchPlaceholder = () => {
    return searchType === 'name' 
      ? 'Search by name (e.g., John Doe)'
      : 'Search by phone number (e.g., 1234567890)';
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2 className="search-title">
          <Search className="search-title-icon" />
          Spam Detection Search
        </h2>
        <p className="search-subtitle">
          Search for phone numbers to check their spam likelihood
        </p>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-type-selector">
          <label className="search-type-option">
            <input
              type="radio"
              name="searchType"
              value="name"
              checked={searchType === 'name'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <User size={16} />
            Search by Name
          </label>
          <label className="search-type-option">
            <input
              type="radio"
              name="searchType"
              value="phone"
              checked={searchType === 'phone'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <Phone size={16} />
            Search by Phone
          </label>
        </div>

        <div className="search-input-group">
          <div className="search-input-container">
            <Search className="search-input-icon" />
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getSearchPlaceholder()}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="btn btn--primary search-button"
            disabled={loading || !searchQuery.trim()}
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="search-error" role="alert">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          <h3 className="results-title">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </h3>
          <div className="results-list">
            {results.map((person) => (
              <div
                key={person.id}
                className="result-item"
                onClick={() => handlePersonClick(person)}
              >
                <div className="result-info">
                  <div className="result-name">{person.name}</div>
                  <div className="result-phone">{person.phone}</div>
                </div>
                <div className="result-spam">
                  <SpamIndicator likelihood={person.spamLikelihood} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDetails && selectedPerson && (
        <PersonDetails
          person={selectedPerson}
          onClose={handleCloseDetails}
          onReportSpam={onReportSpam}
        />
      )}
    </div>
  );
};