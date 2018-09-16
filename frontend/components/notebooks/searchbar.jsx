import React from 'react';

const SearchBar = (props) => {
  return (
    <div className="searchbar">
      <input type="text" className="searchbar" placeholder="Search all notes...">
      </input>
      <img className="search-icon" />
    </div>
  )
}

export default SearchBar;
