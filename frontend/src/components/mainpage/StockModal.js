import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './StockModal.css';
import stockNameAutoComplete from '../../utils/autoComplete';
import AutoCompleteResult from './AutoCompleteResult';

const StockModal = ({
  currentPortfolio,
  closeModal
}) => {
  const [formData, setFormData] = useState({
    ticker: '',
    pricePerShare: '',
    quantity: '',
    transactionDate: new Date().toJSON().slice(0, 10),
    transactionType: 'buy'
  });
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [renderAutoComplete, setRenderAutoComplete] = useState(false);
  const [userInput, setUserInput] = useState('');

  const [isTickerInvalid, setIsTickerInvalid] = useState(false);
  const [isPriceInvalid, setIsPriceInvalid] = useState(false);
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [submitFail, setSubmitFail] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);


  const { ticker, pricePerShare, quantity, transactionDate, transactionType } = formData;

  useEffect(() => {
    if (autoCompleteResults.length > 0) setRenderAutoComplete(true);
    else setRenderAutoComplete(false);
  }, [autoCompleteResults]);

  useEffect(() => {
    if (submitFail && formData.ticker.trim() !== '') setIsTickerInvalid(false);
    else if (submitFail && formData.ticker.trim() === '') setIsTickerInvalid(true);
  }, [submitFail, formData.ticker]);

  useEffect(() => {
    if (submitFail && formData.pricePerShare !== '') setIsPriceInvalid(false);
    else if (submitFail && formData.pricePerShare === '') setIsPriceInvalid(true);
  }, [submitFail, formData.pricePerShare]);

  useEffect(() => {
    if (submitFail && formData.quantity !== '') setIsQuantityInvalid(false);
    else if (submitFail && formData.quantity === '') setIsQuantityInvalid(true);
  }, [submitFail, formData.quantity]);

  useEffect(() => {
    if (submitFail && (isTickerInvalid || isPriceInvalid || isQuantityInvalid)) setDisableSubmit(true);
    else setDisableSubmit(false);
  }, [
    submitFail,
    isTickerInvalid,
    isPriceInvalid,
    isQuantityInvalid
  ]);

  const checkFormValidation = () => {
    let isInvalidExist = false;

    setIsTickerInvalid(false);
    setIsPriceInvalid(false);
    setIsQuantityInvalid(false);

    if (formData.ticker.trim() === '') {
      setIsTickerInvalid(true);
      isInvalidExist = true;
    }
    if (formData.pricePerShare === '') {
      setIsPriceInvalid(true);
      isInvalidExist = true;
    }
    if (formData.quantity === '') {
      setIsQuantityInvalid(true);
      isInvalidExist = true;
    }

    if (isInvalidExist) return false;
    else return true;
  }

  const handleInput = event => {
    setUserInput(event.target.value)
    if (event.target.value.trim() === '') return setAutoCompleteResults([]);
    const result = stockNameAutoComplete(event.target.value);
    setAutoCompleteResults(result);
  };

  const handleChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const handleSubmit = event => {
    event.preventDefault();

    const isValidForm = checkFormValidation();

    if (isValidForm) {
      console.log(formData) // replace this console.log to 'edit position action'
      setSubmitFail(false);
    }
    else setSubmitFail(true);
  }

  const handleClickItem = ticker => {
    setFormData({ ...formData, ticker });
    setRenderAutoComplete(false);
  }

  return (
    <div className="stock-modal">
      <div className="position-modal-content">
        <i className="fas fa-times" onClick={() => closeModal()}></i>
        <form autoComplete="off" onSubmit={e => handleSubmit(e)}>
          <div className="form-group form-radio">
            <div className="form-radio__buy">
              <input
                type="radio"
                name="transactionType"
                value='buy'
                checked={transactionType === 'buy'}
                onChange={e => handleChange(e)}
              />
              <label className="radio-label--buy">BUY</label>
            </div>
            <div className="form-radio__sell">
              <input
                type="radio"
                name="transactionType"
                value='sell'
                checked={transactionType === 'sell'}
                onChange={e => handleChange(e)}
              />
              <label className="radio-label--sell">SELL</label>
            </div>
          </div>
          <div>
            <div className="form-group auto-complete-container">
              <label className={isTickerInvalid ? "form-label form-label-error" : "form-label"}>Ticker</label>
              <input
                className={isTickerInvalid ? "form-field form-error" : "form-field"}
                type="text"
                name="ticker"
                onInput={e => handleInput(e)}
                value={ticker}
                onChange={e => handleChange(e)}
              />
              {renderAutoComplete && <AutoCompleteResult
                results={autoCompleteResults}
                userInput={userInput}
                handleClickItem={handleClickItem}
              />}
            </div>
            {isTickerInvalid && <small className="form-error-text">Please input valid ticker.</small>}
          </div>
          <div className="form-group form-price">
            <label className={isPriceInvalid ? "form-label form-label-error" : "form-label"}>Price</label>
            <input
              className={isPriceInvalid ? "form-field form-error" : "form-field"}
              type="number"
              min="0"
              step="0.01"
              name="pricePerShare"
              value={pricePerShare}
              onChange={e => handleChange(e)}
            />
            {isPriceInvalid && <small className="form-error-text">Please input valid price.</small>}
          </div>
          <div className="form-group form-quantity">
            <label className={isQuantityInvalid ? "form-label form-label-error" : "form-label"}>Quantity</label>
            <input
              className={isQuantityInvalid ? "form-field form-error" : "form-field"}
              type="number"
              min="0"
              step="1"
              name="quantity"
              value={quantity}
              onChange={e => handleChange(e)}
            />
            {isQuantityInvalid && <small className="form-error-text">Please input valid quantity.</small>}
          </div>
          <div className="form-group form-date">
            <label className="form-label">Date</label>
            <input
              className="form-field"
              type="date"
              name="transactionDate"
              value={transactionDate}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group btn-edit-position">
            <button
              type="submit" disabled={disableSubmit}>SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

StockModal.propTypes = {
  currentPortfolio: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {})(StockModal);
