
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/Stores/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, getUser } from './redux/Actions/userActions';

import RegisterComponent from './Components/Auth/RegisterComponent';
import LoginComponent from './Components/Auth/LoginComponent';
import PrivateRoute from './Components/Private-routes/PrivateRoute';

import HelpPage from './Pages/HelpPage';
import UserPage from './Pages/UserPage';
import EditUserPage from './Pages/EditUserPage';
import { Grommet, grommet } from 'grommet';
import Page404 from './Pages/404Page';

interface IToken {
  _id: string,
  iat: number,
  exp: number
}


const App: React.FC = () => {

  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken')
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
  })

  return <Provider store={store}>
    <Grommet theme={grommet}>

      <BrowserRouter>
        <Switch>
          <Route component={LoginComponent} path='/login' />
          <Route component={UserPage} path='/user' />
          <Route component={RegisterComponent} path='/register' />
          <Switch>
            <PrivateRoute exact path='/swop' />
            <Route component={UserPage} path='/user' />
            <Route component={HelpPage} path='/help' />
            <Route component={EditUserPage} path='/edit' />
            <Route component={Page404} />
          </Switch>
        </Switch>
      </BrowserRouter>
    </Grommet>
  </Provider>;
}


export default hot(App);
