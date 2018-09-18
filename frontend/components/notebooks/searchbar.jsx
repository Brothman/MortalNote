import React from 'react';

const SearchBar = (props) => {
  return (
    <div className="searchbar">
      <input type="text" className="searchbar-input" placeholder="Search all notes...">
      </input>
      <img className="search-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/search-icon-gray.svg"/>
    </div>
  );
};

export default SearchBar;
