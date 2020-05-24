import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};