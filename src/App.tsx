
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/Stores/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/Actions/authActions';

import UserPage from './Pages/UserPage';
import RegisterComponent from './Components/Auth/RegisterComponent';
import LoginComponent from './Components/Auth/LoginComponent';
import PrivateRoute from './Components/Private-routes/PrivateRoute';

// Check for token to keep user logged in
if (localStorage.getItem('jwtToken')) {
  //sitting auth token header auth
  const token = localStorage.getItem('jwtToken');
  setAuthToken(token!);
  //decoding token
  const decoded: any = jwt_decode(token!);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now();
  //check for expired token
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}



class App extends React.Component {
 
  render() {
    return <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route component={LoginComponent} path='/login' />
          <Route component={UserPage} path='/user' />
          <Route component={RegisterComponent} path='/register' />
          <Switch>
            <PrivateRoute exact path='/swop'/>
            <Route component={UserPage} path='/user' />
          </Switch>
        </Switch>
      </BrowserRouter>
    </Provider>;
  }
}


export default hot(App);
