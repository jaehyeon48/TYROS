import { combineReducers } from 'redux';

import auth from './auth';
import stock from './stock';

export default combineReducers({
  auth,
  stock
});