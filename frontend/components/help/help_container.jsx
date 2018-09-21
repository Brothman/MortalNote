import React from 'react';
import Header from '../landing_page/header.jsx';
import { Link } from 'react-router-dom';

//Duplicated from plans-container, with the inner text changed
const Help = (props) => {
  return (
    <div className="plans-grid">
      <Header />
      <div className="plans-banner-grid"
           style={{
             "backgroundImage": `url("https://s3.us-east-2.amazonaws.com/mortalnote-images/about-us-background.png")`,
             "backgroundColor": "#00a82d"
           }}>
        <h1 className="choose-plan" style={{"color": "white"}}>Need Help?</h1>
        <p className="plan-paragraph" style={{"right": "-70px", "color": "white"}}>
          We have ideas.
        </p>
        <div className="plan-free-1 plan">
          <p className="plan-name">EXISTENTIAL FEAR</p>
          <p className="FREE">TRY</p>
          <p className="plan-description">MortalNote's mortal note. You die. The note lives on.</p>
          <Link className="no-border signup-for-free" to="/signup">
            <button className="signup-for-free">CHANGE YOUR LIFE. SIGN UP!</button>
          </Link>
        </div>
        <div className="plan-free-2 plan">
          <p className="plan-name">TERROR OF CHANGE</p>
          <p className="FREE">TRY</p>
          <p className="plan-description">MortalNote's stable and predictable interface. </p>
          <Link className="no-border signup-for-free" to="/signup">
            <button className="signup-for-free">CHANGE YOUR LIFE. SIGN UP!</button>
          </Link>
        </div>
        <div className="plan-free-3 plan">
          <p className="plan-name">LONELINESS</p>
          <p className="FREE">TRY</p>
          <p className="plan-description">Friends. Friends are marvelous.</p>
          <Link className="no-border signup-for-free" to="/signup">
            <button className="signup-for-free">CHANGE YOUR LIFE. SIGN UP!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
