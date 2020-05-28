import axios from 'axios';

import {
  PORTFOLIO_LOADED,
  PORTFOLIOS_LOADED,
  SELECT_PORTFOLIO,
  PORTFOLIO_EDITED
} from '../actions/types';

export const loadPortfolios = () => async dispatch => {
  try {
    const response = await axios.get('/api/portfolio');

    dispatch({
      type: PORTFOLIOS_LOADED,
      payload: response.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadPortfolio = portfolioId => async dispatch => {
  try {
    const response = await axios.get(`/api/portfolio/${portfolioId}`);

    dispatch({
      type: PORTFOLIO_LOADED,
      payload: response.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const selectPortfolio = id => async dispatch => {
  dispatch({
    type: SELECT_PORTFOLIO,
    payload: id
  });
}

export const editPortfolioName = (id, name) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.patch(`/api/portfolio/${id}`, JSON.stringify({ name }), config);

    // dispatch({
    //   type: PORTFOLIO_EDITED,
    //   payload: response.data
    // });
    dispatch(loadPortfolios());
  } catch (err) {
    console.error(err);
  }
};