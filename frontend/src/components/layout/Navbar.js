import React from 'react';

import tyrosLogo from '../../images/tyros-logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={tyrosLogo} alt="tyros main logo" />
      </div>
      <p className="test">login</p>
    </nav>
  );
};

export default Navbar;
