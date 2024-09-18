import React from 'react';

const SearchBar = ({ onSearch, searchTerm }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search projects..."
      value={searchTerm}
      onChange={handleSearch}
      style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}
    />
  );
};

export default SearchBar;
