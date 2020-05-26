import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadAllShares,
  organizeShare
} from '../../actions/stock';
import StockItem from './StockItem';
import './MainPage.css';

const MainPage = ({
  loadAllShares,
  organizeShare,
  stock: {
    stocks,
    loading,
    organizedStocks
  }
}) => {
  useEffect(() => {
    loadAllShares();
  }, []);

  useEffect(() => {
    for (let [ticker, value] of Object.entries(stocks)) {
      organizeShare(ticker, value);
    }
  }, [stocks])

  return (
    <div className="stock-container">
      {organizedStocks.length > 0 ? organizedStocks.map((share, index) => (
        <StockItem stock={share} key={index} />
      )) : (
          <p>Input stock</p>
        )}
    </div>
  );
};

MainPage.propTypes = {
  loadAllShares: PropTypes.func.isRequired,
  organizeShare: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stock: state.stock
});

export default connect(mapStateToProps, {
  loadAllShares,
  organizeShare
})(MainPage);
