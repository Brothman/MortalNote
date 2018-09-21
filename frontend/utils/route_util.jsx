import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// renders component if logged out, otherwise redirects to the notebooks page
//notebooks is app home page (soon to be notes, I believe)
const Auth = ( {component: Component, path, loggedIn, exact} ) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn? (
      <Component {...props} />
    ): (
      <Redirect to="/notes" />
    )
  )} />
);

// renders component if logged in, otherwise redirects to the landing page
const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const mapStateToProps = state => {
  //session id is an ID (truthy) if logged in, otherwise null (falsy)
  return {loggedIn: Boolean(state.session.id)};
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
