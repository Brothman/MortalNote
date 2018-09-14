import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header">
      <Link className="logo-image" to="/">
        <img className="logo-image" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/wolf-logo.png" />
      </Link>
      <h6 className="mortal-note">MortalNote</h6>
      <div className="nav-bar-grid">
        <Link className="nav-bar-links why-evernote" to ="/why-mortalnote">Why MortalNote</Link>
        <Link className="nav-bar-links plans" to ="/plans">Plans </Link>
        <Link className="nav-bar-links help-and-learning" to ="/help-and-learning">Help & Learning</Link>
        <Link className="nav-bar-links about-us" to ="/about-us">About Us</Link>
        <img className="arrow1" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/black_arrow.svg" />
        <img className="arrow2" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/black_arrow.svg" />
      </div>
      <div className="signup-login-buttons-grid">
        <Link className="signup-button" to ="/signup">Sign up</Link>
        <p className="or-header">or</p>
        <Link className="login-button" to ="/login">Log In</Link>
      </div>
    </div>

  );
};

export default Header;
