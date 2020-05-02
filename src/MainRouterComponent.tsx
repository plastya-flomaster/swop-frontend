import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginComponent from './Components/Auth/LoginComponent';
import UserPage from './Pages/UserPage';
import RegisterComponent from './Components/Auth/RegisterComponent';
import PrivateRoute from './Components/Private-routes/PrivateRoute';
import HelpPage from './Pages/HelpPage';
import EditUserPage from './Pages/EditUserPage';
import Page404 from './Pages/404Page';

import { connect } from 'react-redux';
import { getCategories } from './redux/Actions/CategoriesActions';
import { AppState } from './redux/Stores/store';

interface IMainRouter {
  getCategories: () => void;
}

const MainRouter: React.FC<IMainRouter> = (props) => {
  useEffect(() => {
    props.getCategories();
  }, []);
  return (
    <HashRouter>
      <Switch>
        <Route component={LoginComponent} path="/login" />
        <Route component={UserPage} path="/user" />
        <Route component={RegisterComponent} path="/register" />
        <Switch>
          <PrivateRoute exact path="/swop" />
          <Route component={UserPage} path="/user" />
          <Route component={HelpPage} path="/help" />
          <Route component={EditUserPage} path="/edit" />
          <Route path="/">
            <Redirect to="/swop" />
          </Route>
          <Route component={Page404} />
        </Switch>
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = (state: AppState) => ({});
export default connect(mapStateToProps, { getCategories })(MainRouter);
