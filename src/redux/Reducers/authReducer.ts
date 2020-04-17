import { SET_CURRENT_USER, USER_LOADING } from '../Actions/types';

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log("setCurrentUser");
            
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}