import React from 'react';
import PropTypes from 'prop-types';

import './LandingPage.css';

const LandingPage = props => {
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

}

export default LandingPage
