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
        case ItemsActions.UPDATE_ITEM:
            const index = state.items.findIndex((item) => item._id === action.payload._id);
            return {
                error: null,
                loading: false,
                items: [ 
                    ...state.items.slice(0, index),
                    action.payload,
                    ...state.items.slice(index+1)
                ],

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
