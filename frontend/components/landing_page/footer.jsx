import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <div className="footer">
      <span className="certification">
        2018 MortalNote Corporation. No rights reserved.
      </span>
      <a className="github" href="https://github.com/Brothman/MortalNote">
        Github
      </a>
      <a className="linked-in" href="https://www.linkedin.com/in/brothman7000/">
        LinkedIn
      </a>
    </div>
  );
};

export default Footer;
