import { AppActionType } from '../Actions/ActionTypes';
import { ILikedItemsReducer } from './reducerTypes';
import { LikeditemsActions } from '../Actions/likedItemsActions';

const initialState = {
  loading: false,
  pairs: [],
  error: null,
};

export default (
  state = initialState,
  action: AppActionType
): ILikedItemsReducer => {
  switch (action.type) {
    case LikeditemsActions.LIKED_ITEMS_PAIRS:
      return {
        loading: false,
        pairs: action.payload,
        error: null,
      };
    case LikeditemsActions.LIKED_ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LikeditemsActions.LIKED_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
