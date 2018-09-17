import React from 'react';
import Header from '../landing_page/header.jsx';

const AboutUs = (props) => {
  return (
    <div className="about-us-grid">
      <Header />
      <div className="about-us-banner-grid">
        <h1 className="about-us-htag">About MortalNote</h1>
        <p className="about-us-description">
          MortalNote was founded to address a growing problem that technology
          helped to create: how to gain web development experience without a
          web development job.
        </p>
        <p className="about-us-description-explained">
          Our purpose is to give Benji the necessary portfolio piece and experience
          so that he can focus on what matters most: coding.
        </p>
        <img className="about-us-img" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/about-us-hero.png"/>
      </div>
    </div>
  );
};

export default AboutUs;
