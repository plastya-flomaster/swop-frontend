import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

import { IUserInfo } from '../../utils/interface';
import { Dispatch } from 'react';
import { AppActionType } from './ActionTypes';

export enum UserActions {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    USER_LOGOUT = 'USER_LOGOUT',
    USER_LOADING = 'USER_LOADING',
    USER_ERROR = 'USER_ERROR'

};

//set loggedin user
export const setCurrentUser = (payload: IUserInfo): AppActionType => ({
    type: UserActions.SET_CURRENT_USER,
    payload
});

//user loading
export const setUserLoading = (): AppActionType => ({
    type: UserActions.USER_LOADING
});


//send errors
export const sendErrors = (payload: any): AppActionType => ({
    type: UserActions.USER_ERROR,
    payload
});

export const userLogout = (): AppActionType => ({
    type: UserActions.USER_LOGOUT
})

//НЕ ЭКШЕНЫ
export const updateUser = (id: string, user: IUserInfo) => (dispatch: Dispatch<AppActionType>) => {
    axios.put(`http://localhost:5000/api/users/${id}/update/`, {}, { params: user })
        .then(res => {
            console.log(res.data);
            dispatch(setCurrentUser(res.data));
        }) //установим текущего юзера)
        .catch(err => dispatch(sendErrors(err.response.data)));
}

//register user
export const registerUser = (userData: IUserInfo, history: any) => (dispatch: Dispatch<AppActionType>) => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch(sendErrors(err.response.data)));
};

//login - getting user token
export const loginUser = (userData: IUserInfo) => (dispatch: Dispatch<AppActionType>) => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            const { token, info } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token); //set auth token to auth header
            // const decoded: any = jwt_decode(token);// decode token to get user data
            dispatch(setCurrentUser(info)); //установим текущего юзера
        }).catch(err => dispatch(sendErrors(err.response.data)));
};

//Выход из приложения
export const logoutUser = (): any => (dispatch: any) => {
    //Удаляем token из local storage
    localStorage.removeItem('jwtToken');
    //remove auth header for next requests
    setAuthToken(false);
    //clean current user
    dispatch(userLogout());
};

export const deleteUser = (id: string) => (dispatch: Dispatch<AppActionType>) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(res => { 
            console.log(res.data);
            dispatch(logoutUser());
         })
        .catch(err => dispatch(sendErrors(err.response.data)));
};




