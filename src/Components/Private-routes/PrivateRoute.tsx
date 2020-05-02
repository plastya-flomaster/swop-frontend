import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from '../../Pages/MainPage';
import UserPage from '../../Pages/UserPage';
import HelpPage from '../../Pages/HelpPage';
import EditUserPage from '../../Pages/EditUserPage';
import MatchPage from '../../Pages/MatchPage';
import { AppState } from '../../redux/Stores/store';
import { getCategories } from '../../redux/Actions/CategoriesActions';

interface IPrivetRouter {
  getCategories: () => void;
}

const PrivateRoute: React.FC<IPrivetRouter> = (props) => {
  useEffect(() => {
    props.getCategories();
  }, []);
  return (
    <Switch>
      <Route component={MainPage} path="/swop" />
      <Route component={UserPage} path="/user" />
      <Route component={HelpPage} path="/help" />
      <Route component={EditUserPage} path="/edit" />
      <Route component={MatchPage} path="/match" />
    </Switch>
  );
};

const mapStateToProps = (state: AppState) => ({});

export default connect(mapStateToProps, { getCategories })(PrivateRoute);
