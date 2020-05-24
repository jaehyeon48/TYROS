import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';

import './SignUp.css';
import { signUpValidator } from '../../validators/signUpValidator';
import { signUp } from '../../actions/auth';

const SignUp = ({
  isAuthenticated,
  signUp
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName, lastName, email, password } = formData;

  const [submitFail, setSubmitFail] = useState(false);
  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    if (submitFail && firstName.trim() !== '') setIsFirstNameInvalid(false);
    else if (submitFail && firstName.trim() === '') setIsFirstNameInvalid(true);
  }, [submitFail, firstName]);

  useEffect(() => {
    if (submitFail && lastName.trim() !== '') setIsLastNameInvalid(false);
    else if (submitFail && lastName.trim() === '') setIsLastNameInvalid(true);
  }, [submitFail, lastName]);

  useEffect(() => {
    if (submitFail && validator.isEmail(email)) setIsEmailInvalid(false);
    else if (submitFail && !validator.isEmail(email)) setIsEmailInvalid(true);
  }, [submitFail, email]);

  useEffect(() => {
    if (submitFail && validator.isLength(password, { min: 4 })) setIsPasswordInvalid(false);
    else if (submitFail && !validator.isLength(password, { min: 4 })) setIsPasswordInvalid(true);
  }, [submitFail, password]);

  useEffect(() => {
    if (submitFail && (isFirstNameInvalid || isLastNameInvalid
      || isEmailInvalid || isPasswordInvalid)) setDisableSubmit(true);
    else setDisableSubmit(false);
  }, [
    submitFail,
    isFirstNameInvalid,
    isLastNameInvalid,
    isEmailInvalid,
    isPasswordInvalid
  ]);

  const handleChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const handleSubmit = event => {
    event.preventDefault();
    const validationResult = signUpValidator(formData);
    if (validationResult === 0) signUp(formData);
    else {
      setSubmitFail(true);
      setIsFirstNameInvalid(false);
      setIsLastNameInvalid(false);
      setIsEmailInvalid(false);
      setIsPasswordInvalid(false);
      validationResult.forEach(errCode => {
        if (errCode === -1) setIsFirstNameInvalid(true);
        if (errCode === -2) setIsLastNameInvalid(true);
        if (errCode === -3) setIsEmailInvalid(true);
        if (errCode === -4) setIsPasswordInvalid(true);
      });
    }
  };

  const [showPwd, toggleShowPwd] = useState(false);
  const handleShowPwd = () => toggleShowPwd(!showPwd)


  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <React.Fragment>
      <div className="container">
        <p className="signup-subtitle">Join TYROS</p>
        <h1 className="signup-title">CREATE YOUR ACCOUNT</h1>
        <form className="form-signUp" onSubmit={e => handleSubmit(e)}>
          <div className="form-group group-signUp-firstName">
            <label className={isFirstNameInvalid ? "form-label-error" : "form-label"}>First Name</label>
            <input
              type="text"
              className={isFirstNameInvalid ? "form-field form-error" : "form-field"}
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={e => handleChange(e)}
            />
            {isFirstNameInvalid ? (<small className="form-error-text">First name is invalid.</small>) : null}
          </div>
          <div className="form-group group-signUp-lastName">
            <label className={isLastNameInvalid ? "form-label-error" : "form-label"}>Last Name</label>
            <input
              type="text"
              className={isLastNameInvalid ? "form-field form-error" : "form-field"}
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={e => handleChange(e)}
            />
            {isLastNameInvalid ? (<small className="form-error-text">Last name is invalid.</small>) : null}
          </div>
          <div className="form-group group-signUp-email">
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
          <div className="form-group group-signUp-password">
            <label className={isPasswordInvalid ? "form-label-error" : "form-label"}>Password</label>
            <input
              type={showPwd ? "text" : "password"}
              className={isPasswordInvalid ? "form-field form-error" : "form-field"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={e => handleChange(e)}
            />
            {isPasswordInvalid ? (<small className="form-error-text">Password is invalid.</small>) : null}
          </div>
          <label className="chkbox-container">Show password
            <input type="checkbox" onClick={() => handleShowPwd()} />
            <span className="checkmark"></span>
          </label>
          <div className="form-group group-btn-signUp">
            <button type="submit" className="btn btn-signUp" disabled={disableSubmit}>SIGN UP</button>
          </div>
        </form>
        <div className="have-account">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </React.Fragment>
  );
}

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signUp })(SignUp);
