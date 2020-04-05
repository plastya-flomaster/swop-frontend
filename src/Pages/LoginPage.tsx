import * as React from 'react';
import Login from '../Components/Login/LoginComponent';
import { IUserInfo } from '../utils/interface';

const LoginPage: React.FC = () => {

    let userInfo: IUserInfo = {
        login: localStorage.getItem('userLogin') || '',
        password: localStorage.getItem('userPassword') || ''
    }
    return <><Login user={userInfo}></Login></>;
}
export default LoginPage; 