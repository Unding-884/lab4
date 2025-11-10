import React from 'react';
import "./SearchBar.css";

function SearchBar({ searchTerm, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default React.memo(SearchBar);