import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Login.css';

const Login = props => {
  return (
    <React.Fragment>
      <div className="container">
        <p className="login-subtitle">Join TYROS</p>
        <h1 className="text-main login-title">LOGIN</h1>
        <form className="form-login">
          <div className="form-group group-login-email">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-field"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group group-login-password">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-field"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group group-btn-login">
            <button className="btn btn-login">LOGIN</button>
          </div>
        </form>
        <div className="have-account">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {

};

export default Login;
