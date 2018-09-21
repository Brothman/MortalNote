import React from 'react';
import Header from '../landing_page/header.jsx';

class WhyMortalNote extends React.Component {
  render () {
    return (
      <div className="why-mortalnote-grid">
        <Header />
        <div className="why-mortalnote-banner-grid">
          <h1 className="why-mortalnote-htag">Why MortalNote?</h1>
          <p className="why-mortalnote-hidden-potential">
            {"MortalNote helps people realize their hidden potential. It's where "}
            dreams become reality, where life dances with death, and where
            humans become gods.
          </p>
          <p className="why-mortalnote-evernote-better">
            {"See why virtually 0 users implement MoralNote's products. "}
            {"Hint: it's because Evernote is better."}
          </p>
          <img className="why-mortalnote-img" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/why-evernote-hero-desktop.png"/>
        </div>
      </div>
    );
  }
}

export default WhyMortalNote;
