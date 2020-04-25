import { combineReducers } from 'redux';
import authReducer from './userReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
});