import { IItemsReducer } from "./reducerTypes";
import { AppActionType } from '../Actions/ActionTypes';
import { ItemsActions } from '../Actions/itemsActions';

const initialState: IItemsReducer = {
    loading: false,
    items: [],
    error: null
};

export default (state = initialState, action: AppActionType): IItemsReducer => {
    switch (action.type) {
        case ItemsActions.GET_ITEMS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };
        case ItemsActions.ADD_ITEM:
            return state;
        case ItemsActions.UPDATE_ITEMS:
            return {
                error: null,
                loading: false,
                items: action.payload,
            };
        case ItemsActions.DEL_ITEM:
            return state;
        case ItemsActions.ITEM_LOADING:
            return {
                ...state,
                loading: true
            };
        case ItemsActions.ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
