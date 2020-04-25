import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from '../../Pages/MainPage';

const PrivateRoute: React.FC<any> = ({ component: Component, auth, ...rest }) => {
    return (
    <Route>
        {auth.isAuthenticated === true ? (
            <MainPage />
        ) : <Redirect to='/login' />
        }
    </Route>)
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
