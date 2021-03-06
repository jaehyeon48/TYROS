import {
  PORTFOLIO_LOADED,
  PORTFOLIOS_LOADED,
  SELECT_PORTFOLIO
} from '../actions/types';

const initialState = {
  portfolio: null,
  portfolios: [],
  currentPortfolio: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PORTFOLIO_LOADED:
      return {
        ...state,
        portfolio: payload
      };
    case PORTFOLIOS_LOADED:
      return {
        ...state,
        portfolios: payload,
      };
    case SELECT_PORTFOLIO:
      return {
        ...state,
        currentPortfolio: payload
      }
    default:
      return state;
  };
};