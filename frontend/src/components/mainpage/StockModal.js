import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './StockModal.css';
import autoCompleteTestFunc from '../../utils/autoCompleteTest';
import AutoCompleteResult from './AutoCompleteResult';

const StockModal = ({
  currentPortfolio
}) => {
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [renderAutoComplete, setRenderAutoComplete] = useState(false);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (autoCompleteResults.length > 0) setRenderAutoComplete(true);
    else setRenderAutoComplete(false);
  }, [autoCompleteResults]);

  const onInputTest = event => {
    setUserInput(event.target.value)
    if (event.target.value.trim() === '') return setAutoCompleteResults([]);
    const result = autoCompleteTestFunc(event.target.value);
    setAutoCompleteResults(result);
  };

  return (
    <div className="stock-modal">
      <div className="modal-content">
        <form>
          <div className="form-group">
            <label className="form-label">Ticker</label>
            <input
              className="form-field"
              onInput={e => onInputTest(e)}
            />
            {renderAutoComplete && <AutoCompleteResult
              results={autoCompleteResults}
              userInput={userInput}
            />}
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
