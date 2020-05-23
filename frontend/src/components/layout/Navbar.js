import React from 'react';
import { Link } from 'react-router-dom';

import tyrosLogo from '../../images/tyros-logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar py-half">
      <div className="navbar-logo">
        <img src={tyrosLogo} alt="tyros main logo" />
      </div>
      <div className="navbar-auth-links">
        <Link to="/login" className="navbar-login">Login</Link>
        <Link to="/signup" className="navbar-signUp">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
