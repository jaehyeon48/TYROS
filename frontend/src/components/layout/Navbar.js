import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOut } from '../../actions/auth';
import tyrosLogo from '../../images/tyros-logo.png';
import './Navbar.css';

const Navbar = ({
  isAuthenticated,
  logOut,
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

  const handleLogOut = () => {
    if (isSideOpen) setIsSideOpen(!isSideOpen);
    logOut();
  }

  const guest = (
    <React.Fragment>
      <div className="navbar-guest-links">
        <Link to="/login" className="navbar-login">Login</Link>
        <Link to="/signup" className="navbar-signUp">Sign Up</Link>
      </div>
      <div className="navbar-guest-bars" onClick={handleSideMenu}>
        {isSideOpen ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars"></i>)}
      </div>
      <div className={isSideOpen ? "navbar-guest-sideMenu" : "navbar-sideMenu-hidden"}>
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
    </React.Fragment>
  );

  const auth = (
    <React.Fragment>
      <div className="navbar-auth-links">
        <Link to="#" className="navbar-profile">My Profile</Link>
        <Link to="#" className="navbar-portfolios">Portfolios</Link>
        <span className="navbar-editPosition">Edit Position</span>
        <span className="navbar-editCash">Edit Cash</span>
        <span className="navbar-logout" onClick={handleLogOut}>LogOut</span>
      </div>
      <div className="navbar-auth-bars" onClick={handleSideMenu}>
        {isSideOpen ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars"></i>)}
      </div>
      <div className={isSideOpen ? "navbar-auth-sideMenu" : "navbar-sideMenu-hidden"}>
        <div className="side-profile" onClick={linkToHome}>
          <Link to="#">My Profile</Link>
        </div>
        <div className="side-portfolios" onClick={linkToLogin}>
          <Link to="#">Portfolios</Link>
        </div>
        <div className="side-editPosition" onClick={linkToSignUp}>
          <span>Edit Position</span>
        </div>
        <div className="side-editCash" onClick={linkToSignUp}>
          <span>Edit Cash</span>
        </div>
        <div className="side-logout" onClick={handleLogOut}>
          <span>LogOut</span>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar py-half">
        <div className="navbar-logo">
          <Link to="/">
            <img src={tyrosLogo} alt="tyros main logo" />
          </Link>
        </div>
        {isAuthenticated ? auth : guest}
      </nav>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logOut })(withRouter(Navbar));
