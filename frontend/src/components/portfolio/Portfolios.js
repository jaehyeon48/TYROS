import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { loadPortfolios } from '../../actions/portfolio';
import Portfolio from './Portfolio';
import './Portfolios.css';

const Portfolios = ({
  portfolios,
  loadPortfolios
}) => {
  useEffect(() => {
    loadPortfolios();
  }, []);

  return (
    <div className="portfolios-container">
      {portfolios.map(portfolio => <Portfolio key={portfolio._id} portfolio={portfolio}></Portfolio>)}
    </div>
  );
}

Portfolios.propTypes = {
  loadPortfolios: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  portfolios: state.portfolio.portfolios
});

export default connect(mapStateToProps, { loadPortfolios })(Portfolios);
