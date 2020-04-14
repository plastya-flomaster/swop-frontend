
import * as React from 'react';
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import UserPage from './Pages/UserPage';
import RegisterComponent from './Components/Auth/RegisterComponent';

import { Provider } from 'react-redux';
import store from './redux/Stores/store';

class App extends React.Component {
  render() {
    return <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route component={LoginPage} path='/' exact />
          <Route component={MainPage} path='/swop' />
          <Route component={UserPage} path='/user' />
          <Route component={RegisterComponent} path='/register' />
        </Switch>
      </BrowserRouter>
    </Provider>;
  }
}

export default hot(App);
