import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

//register user
export const registerUser = (userData: any, history: string[]) => (dispatch: (arg0: { type: string; payload: any; }) => any) => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//login - getting user token

export const loginUser = (userData: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token); //set auth token to auth header
            const decoded = jwt_decode(token); // decode token to get user data
            dispatch(setCurrentUser(decoded)); //set curr user
        }).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};

//set loggedin user
export const setCurrentUser = (decoded: {}) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

//logging out
export const logoutUser = () => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header for next requests
    setAuthToken(false);
    //clean current user
    dispatch(setCurrentUser({}));
}
