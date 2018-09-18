import React from 'react';
import SearchBar from './searchbar.jsx';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
      <div className="new-note">
        <img className="new-note-plus-circle" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/Add-Note-Plus-Icon.svg" />
        <p className="new-note-text">New Note</p>
      </div>

      <NavLink to="/notes" className="all-notes" activeStyle={{ 'backgroundColor': '#404040'}}>
        <img className="notes-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/all-notes-icon-v2.svg" />
        <p className="all-notes-text">  All Notes </p>
      </NavLink>

      <NavLink to="/notebooks" className="notebooks-button" activeStyle={{ 'backgroundColor': '#404040'}}>
        <img className="notebook-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/notebooks-icon.svg" />
        <p className="notebooks-button-text">  Notebooks </p>
      </NavLink>

      <NavLink to="/trash" className="trash" activeStyle={{ 'backgroundColor': '#404040'}}>
        <img className="trash-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/trash-icon.svg" />
        <p className="trash-text">  Trash </p>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.entities.user[2].email
  }
}

export default connect(mapStateToProps)(Sidebar);
