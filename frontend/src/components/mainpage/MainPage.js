import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadSharesOfPortfolio,
  organizeShare
} from '../../actions/stock';
import StockItem from './StockItem';
import StockModal from './StockModal';
import CashModal from './CashModal';
import './MainPage.css';
import {
  loadPortfolios,
  selectPortfolio
} from '../../actions/portfolio';

const MainPage = ({
  loadSharesOfPortfolio,
  organizeShare,
  loadPortfolios,
  selectPortfolio,
  stock: {
    stocks,
    loading,
    organizedStocks
  },
  portfolio: {
    portfolios,
    currentPortfolio
  }
}) => {
  const [isEditStockModalOpen, setIsEditStockModalOpen] = useState(false);
  const [isEditCashModalOpen, setIsEditCashModalOpen] = useState(false);

  useEffect(() => {
    loadPortfolios();
  }, []);

  useEffect(() => {
    // initialize currentPortfolio
    if (portfolios !== undefined && portfolios.length > 0) selectPortfolio(portfolios[0]._id);
  }, [portfolios])

  useEffect(() => {
    loadSharesOfPortfolio(currentPortfolio);
  }, [currentPortfolio]);

  useEffect(() => {
    for (let [ticker, value] of Object.entries(stocks)) {
      organizeShare(ticker, value);
    }
  }, [stocks])

  const handleDropdown = event => {
    selectPortfolio(event.target.value);
  };

  const openEditPositionModal = () => setIsEditStockModalOpen(true);
  const openEditCashModal = () => setIsEditCashModalOpen(true);

  return (
    <React.Fragment>
      <div className="portfolio-actions-container">
        {portfolios && portfolios.length > 0 && (
          <div className="dropdown-select" onChange={e => handleDropdown(e)}>
            <select value={currentPortfolio !== null && currentPortfolio} readOnly>
              {portfolios.map(portfolio => (
                <option
                  value={portfolio._id}
                  key={portfolio._id}
                >{portfolio.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="action-edit-positions">
          <span className="edit-position" onClick={() => openEditPositionModal()}>Edit Position</span>
          <span className="edit-cash" onClick={() => openEditCashModal()}>Edit Cash</span>
        </div>
      </div>
      <div className="stock-container">
        {portfolios.length === 0 ? (
          <p className="stock-not-exist-msg">Please Create Your Portfolio first!</p>
        ) : null}
        {organizedStocks.length > 0 ? organizedStocks.map((share, index) => (
          <StockItem stock={share} key={index} />
        )) : null}
        {portfolios.length > 0 && organizedStocks.length === 0 && (
          <p className="stock-not-exist-msg">Please Add Your Position first!</p>
        )}
      </div>
      {isEditStockModalOpen && <StockModal />}
      {isEditCashModalOpen && <CashModal />}
    </React.Fragment>
  );
};

MainPage.propTypes = {
  loadSharesOfPortfolio: PropTypes.func.isRequired,
  organizeShare: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  selectPortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stock: state.stock,
  portfolio: state.portfolio
});

export default connect(mapStateToProps, {
  loadSharesOfPortfolio,
  organizeShare,
  loadPortfolios,
  selectPortfolio
})(MainPage);
