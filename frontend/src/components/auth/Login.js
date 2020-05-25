import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';

import './Login.css';
import { loginValidator } from '../../validators/loginValidator';
import { login } from '../../actions/auth';

const Login = ({
  isAuthenticated,
  login
}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const [submitFail, setSubmitFail] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    if (submitFail && validator.isEmail(email)) setIsEmailInvalid(false);
    else if (submitFail && !validator.isEmail(email)) setIsEmailInvalid(true);
  }, [submitFail, email]);

  useEffect(() => {
    if (submitFail && validator.isLength(password, { min: 4 })) setIsPasswordInvalid(false);
    else if (submitFail && !validator.isLength(password, { min: 4 })) setIsPasswordInvalid(true);
  }, [submitFail, password]);

  useEffect(() => {
    if (submitFail && (isEmailInvalid || isPasswordInvalid)) setDisableSubmit(true);
    else setDisableSubmit(false);
  }, [
    submitFail,
    isEmailInvalid,
    isPasswordInvalid
  ]);

  const handleChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const handleSubmit = event => {
    event.preventDefault();

    const validationResult = loginValidator(formData);

    if (validationResult === 0) console.log(12312345)
    else {
      setSubmitFail(true);
      setIsEmailInvalid(false);
      setIsPasswordInvalid(false);
      validationResult.forEach(errCode => {
        if (errCode === -3) setIsEmailInvalid(true);
        if (errCode === -4) setIsPasswordInvalid(true);
      });
    }
  };


  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <React.Fragment>
      <div className="container">
        <p className="login-subtitle">Join TYROS</p>
        <h1 className="text-main login-title">LOGIN</h1>
        <form className="form-login" onSubmit={e => handleSubmit(e)}>
          <div className="form-group group-login-email">
            <label className={isEmailInvalid ? "form-label-error" : "form-label"}>Email</label>
            <input
              type="text"
              className={isEmailInvalid ? "form-field form-error" : "form-field"}
              name="email"
              value={email}
              placeholder="Email"
              onChange={e => handleChange(e)}
            />
            {isEmailInvalid ? (<small className="form-error-text">Email is invalid.</small>) : null}
          </div>
          <div className="form-group group-login-password">
            <label className={isPasswordInvalid ? "form-label-error" : "form-label"}>Password</label>
            <input
              type="password"
              className={isPasswordInvalid ? "form-field form-error" : "form-field"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={e => handleChange(e)}
            />
            {isPasswordInvalid ? (<small className="form-error-text">Password is invalid.</small>) : null}</div>
          <div className="form-group group-btn-login">
            <button className="btn btn-login" disabled={disableSubmit}>LOGIN</button>
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
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
