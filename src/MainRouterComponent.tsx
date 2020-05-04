import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginComponent from './Components/Auth/LoginComponent';
import RegisterComponent from './Components/Auth/RegisterComponent';
import PrivateRoute from './Components/Private-routes/PrivateRoute';
import Page404 from './Pages/404Page';

import { connect } from 'react-redux';
import { AppState } from './redux/Stores/store';

interface IMainRouter {
  isAuthenticated: boolean;
  loading: boolean;
}

const MainRouter: React.FC<IMainRouter> = (props) => {
  return (
    <HashRouter>
      <Switch>
        <Route component={LoginComponent} path="/login" />
        <Route component={RegisterComponent} path="/register" />
        <Switch>
          {props.isAuthenticated ? <PrivateRoute /> : <Redirect to="/login" />}
          <Route path="/">
            <Redirect to="/swop" />
          </Route>
          <Route component={Page404} />
        </Switch>
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps)(MainRouter);
