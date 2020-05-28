import { combineReducers } from 'redux';

import auth from './auth';
import stock from './stock';
import portfolio from './portfolio';

export default combineReducers({
  auth,
  stock,
  portfolio
});