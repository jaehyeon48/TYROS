import {
  STOCKS_LOADED,
  STOCKS_ORGANIZED,
  CLEAR_STOCKS,
  EDIT_POSITION_SUCCESS
} from '../actions/types';

const initialState = {
  stocks: [],
  organizedStocks: [],
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_STOCKS:
      return {
        ...state,
        stocks: [],
        organizedStocks: [],
        loading: false
      };
    case STOCKS_LOADED:
      return {
        ...state,
        stocks: payload,
        loading: false
      }
    case STOCKS_ORGANIZED:
      return {
        ...state,
        organizedStocks: [...state.organizedStocks, payload],
        loading: false
      }
    case EDIT_POSITION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};