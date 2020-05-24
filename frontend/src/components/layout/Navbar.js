import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import tyrosLogo from '../../images/tyros-logo.png';
import './Navbar.css';

const Navbar = ({
  history
}) => {
  const [isSideOpen, setIsSideOpen] = useState(false);

  const handleSideMenu = () => {
    setIsSideOpen(!isSideOpen);
  };

  const linkToHome = () => {
    history.push('/');
    setIsSideOpen(!isSideOpen);
  };

  const linkToLogin = () => {
    history.push('/login');
    setIsSideOpen(!isSideOpen);
  }

  const linkToSignUp = () => {
    history.push('/signup');
    setIsSideOpen(!isSideOpen);
  };
  return (
    <React.Fragment>
      <nav className="navbar py-half">
        <div className="navbar-logo">
          <Link to="/">
            <img src={tyrosLogo} alt="tyros main logo" />
          </Link>
        </div>
        <div className="navbar-auth-links">
          <Link to="/login" className="navbar-login">Login</Link>
          <Link to="/signup" className="navbar-signUp">Sign Up</Link>
        </div>
        <div className="navbar-bars" onClick={handleSideMenu}>
          {isSideOpen ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars"></i>)}
        </div>
        <div className={isSideOpen ? "navbar-sideMenu" : "navbar-sideMenu-hidden"}>
          <div className="side-home" onClick={linkToHome}>
            <Link to="/">Home</Link>
          </div>
          <div className="side-login" onClick={linkToLogin}>
            <Link to="/login">Login</Link>
          </div>
          <div className="side-signUp" onClick={linkToSignUp}>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Navbar);
