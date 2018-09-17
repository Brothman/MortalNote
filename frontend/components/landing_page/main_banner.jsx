import React from 'react';
import { Link } from 'react-router-dom';

const MainBanner = (props) => {
  return (
    <div className="main-banner-grid">
      <h1 className="main-header">Feel mortal without the fear</h1>
      <p className="main-tagline">
        MortalNote helps you capture and prioritize the memories that make life
        worth living, so that you can forget them. Live well.
      </p>
      <Link className="free-signup-button" to="/signup">
        <button className="free-signup-button">SIGN UP FOR FREE</button>
      </Link>
      <img className="main-image" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/homepage-hero-desktop.png"></img>
    </div>
  );
};

export default MainBanner;
