import { combineReducers } from 'redux';
import authReducer from './userReducer';
import itemsReducer from './itemsReducer';
import categoriesReducer from './categoriesReducer';
import likedItemsReducer from './likedItemsReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  categories: categoriesReducer,
  pairs: likedItemsReducer,
});
