import { combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    items: itemsReducer
  });