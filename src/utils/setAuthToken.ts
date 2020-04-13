import axios from 'axios';

const setAuthToken = (token: string | boolean) => {
if(token) {
    //apply auth token to every request if logged in
    axios.defaults.headers.common['Authorization'] = token;
} else {
    //remove auth header
    delete axios.defaults.headers.common['Authorization'];
}
}
export default setAuthToken;