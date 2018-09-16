import React from 'react';
import SearchBar from './searchbar.jsx';
import { connect } from 'react-redux';

const Sidebar = (props) => {
  const username = props.user.email.substring(0, props.user.email.lastIndexOf("@"));
  return (
    <div className="sidebar-grid">
      <span className="user-info">
        <img className="user-avatar"/>
        <p className="username">{username}</p>
        <img className="white-down-arrow" />
      </span>
      <SearchBar />
      <button className="new-note">
        <img className="add-note-plus-circle" />
        New Note
      </button>

      <button className="all-notes">
        <img className="notes-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/all-notes-icon-v2.svg" />
        All Notes
      </button>

      <button className="notebooks-button">
        <img className="notebook-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/notebooks-icon.svg" />
        Notebooks
      </button>

      <button className="trash">
        <img className="trash-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/trash-icon.svg" />
        Trash
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    email: state.entities.user[2].email
  }
}

export default connect(mapStateToProps)(Sidebar);
