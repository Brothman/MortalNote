import React from 'react';
import Header from '../landing_page/header.jsx';
import { Link } from 'react-router-dom';

class Plans extends React.Component {
  render () {
    return (
      <div className="plans-grid">
        <Header />
        <div className="plans-banner-grid">
          <h1 className="choose-plan">Choose a plan</h1>
          <p className="plan-paragraph">
            Find the MortalNote solution that fits your needs.
          </p>
          <div className="plan-free-1 plan">
            <p className="plan-name">MORTALNOTE BASIC</p>
            <p className="FREE">FREE</p>
            <p className="plan-description">Take superb notes</p>
            <Link className="no-border signup-for-free" to="/signup">
              <button className="signup-for-free">SIGN UP FOR FREE</button>
            </Link>
          </div>
          <div className="plan-free-2 plan">
            <p className="plan-name">MORTALNOTE PREMIUM</p>
            <p className="FREE">FREE</p>
            <p className="plan-description">Organize your life</p>
            <Link className="no-border signup-for-free" to="/signup">
              <button className="signup-for-free">SIGN UP FOR FREE</button>
            </Link>
          </div>
          <div className="plan-free-3 plan">
            <p className="plan-name">MORTALNOTE BUSINESS</p>
            <p className="FREE">FREE</p>
            <p className="plan-description">Make your company whole</p>
            <Link className="no-border signup-for-free" to="/signup">
              <button className="signup-for-free">SIGN UP FOR FREE</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Plans;
