import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
import { IUserInfo } from '../../utils/interface';
import { Dispatch } from 'react';
import { AppActionType } from './ActionTypes';

//register user
export const registerUser = (userData: IUserInfo, history: any) => (dispatch: Dispatch<AppActionType>) => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch(sendErrors(err.response.data)));
};

//login - getting user token
export const loginUser = (userData: any) => (dispatch: Dispatch<AppActionType>) => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token); //set auth token to auth header
            const decoded: any = jwt_decode(token); // decode token to get user data
            dispatch(setCurrentUser(decoded)); //set curr user
        }).catch(err => dispatch(sendErrors(err.response.data)));
};

//set loggedin user
export const setCurrentUser = (decoded: any): AppActionType => ({
    type: SET_CURRENT_USER,
    payload: decoded
});

//user loading
export const setUserLoading = (): AppActionType => {
    return {
        type: USER_LOADING
    };
};

//logging out
export const logoutUser = (): any => (dispatch: any) => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header for next requests
    setAuthToken(false);
    //clean current user
    dispatch(setCurrentUser({}));
}

//send errors
export const sendErrors = (payload: any): AppActionType => {
    return {
        type: GET_ERRORS,
        payload
    }

} 
