import React from 'react';
import PropTypes from 'prop-types';

import './SignUp.css';

const SignUp = props => {
  return (
    <React.Fragment>
      <div className="container">
        <p className="signup-subtitle">Join TYROS</p>
        <h1 className="signup-title">CREATE YOUR ACCOUNT</h1>
        <form className="form-signUp">
          <div className="form-group group-firstName">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-field"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="form-group group-lastName">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-field"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group group-email">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-field"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group group-password">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-field"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group group-btn-signUp">
            <button className="btn btn-signUp">SIGN UP</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

SignUp.propTypes = {

};

export default SignUp;
