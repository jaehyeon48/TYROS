import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';
import axios from 'axios';

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

  } catch (err) {
    console.error(err);
  }
};