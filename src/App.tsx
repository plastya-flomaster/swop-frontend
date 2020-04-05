
import * as React from 'react';
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';

class App extends React.Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route component={LoginPage} path='/' exact />
        <Route component={MainPage} path='/swop' />
      </Switch>
    </BrowserRouter>;
  }
}

export default hot(App);
