import { ICategoriesReducer } from './reducerTypes';
import { AppActionType } from '../Actions/ActionTypes';
import {CategoriesActions} from '../Actions/CategoriesActions';

const initialState: ICategoriesReducer = {
    loading: false,
    categories: [],
    error: null
};

export default (state = initialState, action: AppActionType): ICategoriesReducer => {
    switch (action.type) {
        case CategoriesActions.GET_CATEGORIES:
            return {
                loading: false,
                categories: action.payload,
                error: null
            }
            case CategoriesActions.CATEGORIES_LOADING:
            return{
                ...state,
                loading: true
            }
            case CategoriesActions.CATEGORIES_ERROR:
                return {
                    ...state,
                    error: action.payload
                }
    
        default:
            return state;
    }
} 