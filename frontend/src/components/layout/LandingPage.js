import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import './LandingPage.css';

const LandingPage = ({
  isAuthenticated
}) => {
  if (isAuthenticated) {
    return <Redirect to="/main" />
  }

  return (
    <div className="main-container landing-back-color">
      <header className="landing-header">
        <div className="landing-header-filter">
          <div className="landing-header-title">
            <h1>Manage & Track your portfolio with <span>TYROS</span></h1>
          </div>
          <div className="landing-header-subtitle">
            TYROS, a pioneer of commission-free investing, gives you more ways to make your money work harder.
          </div>
        </div>
      </header>
      <section className="landing-section">
        <div>
          <h2></h2>
        </div>
      </section>
    </div>
  );
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);
