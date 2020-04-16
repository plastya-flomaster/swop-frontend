import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// interface IPrivateRouteProps {
//         Component: React.FC,
//         auth: {
//             isAuthenticated: boolean
//         },

// }

const PrivateRoute: React.FC<any> = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            debugger;
            auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : <Redirect to='/login' />
        }}
    />
)

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
