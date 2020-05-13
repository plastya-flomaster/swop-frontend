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
  USER_ERROR = 'USER_ERROR',
}

//set loggedin user
export const setCurrentUser = (payload: IUserInfo): AppActionType => ({
  type: UserActions.SET_CURRENT_USER,
  payload,
});

//user loading
export const setUserLoading = (): AppActionType => ({
  type: UserActions.USER_LOADING,
});

//send errors
export const sendErrors = (payload: any): AppActionType => ({
  type: UserActions.USER_ERROR,
  payload,
});

export const userLogout = (): AppActionType => ({
  type: UserActions.USER_LOGOUT,
});

//НЕ ЭКШЕНЫ
export const getUser = (id: string): any => (dispatch: Dispatch<any>) => {
  dispatch(setUserLoading());
  axios
    .get(`/api/users/${id}`)
    .then((res) => {
      dispatch(setCurrentUser(res.data));
    })
    .catch((err) => dispatch(sendErrors(err.response.data)));
};

export const updateUser = (user: IUserInfo) => (
  dispatch: Dispatch<AppActionType>
) => {
  axios
    .put(`/api/users/${user._id}/update/`, {}, { params: user })
    .then((res) => {
      dispatch(setCurrentUser(res.data));
    }) //установим текущего юзера)
    .catch((err) => {
      dispatch(sendErrors(err.response.data));
    });
};

//register user
export const registerUser = (userData: IUserInfo, history: any) => (
  dispatch: Dispatch<AppActionType>
) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) => dispatch(sendErrors(err.response.data)));
};

//login - getting user token
export const loginUser = (userData: IUserInfo) => (
  dispatch: Dispatch<AppActionType>
) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { token, info } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token); //set auth token to auth header
      // const decoded: any = jwt_decode(token);// decode token to get user data
      dispatch(setCurrentUser(info)); //установим текущего юзера
    })
    .catch((err) => dispatch(sendErrors(err.response.data)));
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

export const deleteUser = (id: string) => (
  dispatch: Dispatch<AppActionType>
) => {
  axios
    .delete(`/api/users/${id}`)
    .then((res) => {
      dispatch(logoutUser());
    })
    .catch((err) => dispatch(sendErrors(err.response.data)));
};

export const uploadUserPic = (userId: string, formData: File) => (
  dispatch: Dispatch<AppActionType>
) => {  
  console.log(userId);
  console.log(formData);  
  
  axios.put(`api/users/avatar/${userId}`, formData)
  .then((res) => 
    dispatch(setCurrentUser(res.data)))
    .catch((err) =>
      dispatch(sendErrors(err.response.data))
    );
  };

