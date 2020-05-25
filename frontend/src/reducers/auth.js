import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR
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
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload
      };
    default:
      return state;
  }
};