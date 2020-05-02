import { combineReducers } from 'redux';
import authReducer from './userReducer';
import itemsReducer from './itemsReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  categories: categoriesReducer
});