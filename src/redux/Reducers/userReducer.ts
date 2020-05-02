import { IUserReducer } from './reducerTypes';
import { AppActionType } from '../Actions/ActionTypes';
import { UserActions } from '../Actions/userActions';

const isEmpty = require('is-empty');

const initialState: IUserReducer = {
    isAuthenticated: false,
    user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    loading: false,
    error: null,
}

export default function (state = initialState, action: AppActionType): IUserReducer {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false,
                error: null,
            }
        case UserActions.USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case UserActions.USER_LOGOUT:
            return initialState;
        case UserActions.USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}