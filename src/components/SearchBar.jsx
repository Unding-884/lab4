import React, { useCallback } from 'react';
import "./SearchBar.css";

function SearchBar({ searchTerm, onChange }) {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search todos"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default React.memo(SearchBar);