import axios from 'axios';

import {
  CLEAR_STOCKS,
  STOCKS_LOADED,
  STOCKS_ORGANIZED,
  EDIT_POSITION_SUCCESS
} from '../actions/types';


const classifyStocks = (stocks) => {
  const classifiedStocks = {}
  const tickers = [];
  stocks.forEach(share => {
    const tickerOfShare = share.ticker.toLowerCase();
    const isTickerExist = tickers.findIndex(ticker => ticker === tickerOfShare);
    if (isTickerExist === -1) tickers.push(tickerOfShare);
  });

  tickers.forEach(ticker => {
    classifiedStocks[ticker] = [];
  });

  stocks.forEach(share => {
    classifiedStocks[share.ticker.toLowerCase()].push(share);
  });

  return classifiedStocks;
};

export const organizeShare = (ticker, shareInfo) => async dispatch => {
  shareInfo.sort((a, b) => (a.transactionType < b.transactionType) ? 1 : ((b.transactionType < a.transactionType) ? -1 : 0));
  const share = {};
  let totalCost = 0;
  let totalQty = 0;
  share.ticker = ticker;


  let sellQty = 0;
  shareInfo.forEach(share => {
    if (share.transactionType === 'sell') {
      sellQty += share.quantity;
    }
    else if (share.transactionType === 'buy') {
      const shareQty = share.quantity - sellQty;
      if (shareQty > 0) {
        totalCost += share.pricePerShare * shareQty;
        totalQty += shareQty;
        sellQty = 0;
      } else if (shareQty < 0) {
        sellQty = -shareQty;
      } else {
        sellQty = 0;
      }
    }
  });

  share.avgCost = (totalQty <= 0 ? 0 : (totalCost / totalQty).toFixed(2));
  share.quantity = (totalQty <= 0 ? 0 : totalQty);

  dispatch({
    type: STOCKS_ORGANIZED,
    payload: share
  });
}

export const loadAllShares = () => async dispatch => {
  try {
    const response = await axios.get('/api/stock');
    const classifiedShares = classifyStocks(response.data);
    dispatch({
      type: CLEAR_STOCKS
    });
    dispatch({
      type: STOCKS_LOADED,
      payload: classifiedShares
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadSharesOfPortfolio = portfolioId => async dispatch => {
  try {
    const response = await axios.get(`/api/stock/${portfolioId}`);
    const classifiedShares = classifyStocks(response.data);
    dispatch({
      type: CLEAR_STOCKS
    });
    dispatch({
      type: STOCKS_LOADED,
      payload: classifiedShares
    })
  } catch (err) {
    console.error(err);
  }
}

export const editPosition = (formData, portfolioId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    formData.portfolioId = portfolioId;

    await axios.post('/api/stock', JSON.stringify(formData), config);
    dispatch({ type: EDIT_POSITION_SUCCESS });
  } catch (err) {
    console.error(err);
  }
}