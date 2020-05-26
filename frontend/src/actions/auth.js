import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR
} from './types';
import axios from 'axios';

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth');

    if (response.status === 200) {
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    }
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const signUp = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { firstName, lastName, email, password } = formData;

  const reqBody = JSON.stringify({ firstName, lastName, email, password });

  try {
    await axios.post('/api/user', reqBody, config);

    dispatch({ type: SIGNUP_SUCCESS });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: SIGNUP_FAIL });
    console.error(err);
  }
};

export const login = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { email, password } = formData;

  try {
    const reqBody = JSON.stringify({ email, password });

    await axios.post('/api/auth', reqBody, config);

    dispatch({ type: LOGIN_SUCCESS });
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logOut = () => async dispatch => {
  try {
    await axios.get('/api/auth/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err);
  }
};