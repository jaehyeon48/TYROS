import axios from 'axios';

import {
  PORTFOLIOS_LOADED,
  SELECT_PORTFOLIO
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

export const selectPortfolio = id => async dispatch => {
  dispatch({
    type: SELECT_PORTFOLIO,
    payload: id
  });
}