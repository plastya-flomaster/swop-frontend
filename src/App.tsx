import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { Provider } from 'react-redux';
import store from './redux/Stores/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, getUser } from './redux/Actions/userActions';

import { Grommet, grommet } from 'grommet';
import MainRouter from './MainRouterComponent';
import { useEffect } from 'react';

interface IToken {
  _id: string;
  iat: number;
  exp: number;
}

const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      //добавляем токен в localStorage
      setAuthToken(token!);
      //дешифруем токен
      const decoded: IToken = jwt_decode(token);
      store.dispatch(getUser(decoded._id));
      const currentTime = Date.now() / 1000;
      // проверяем не истек ли токен
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = './login';
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Grommet theme={grommet}>
        <MainRouter />
      </Grommet>
    </Provider>
  );
};

export default hot(App);
