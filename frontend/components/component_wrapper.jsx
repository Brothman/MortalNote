import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login_form/login_form_container.js';
import SignUpForm from './signup_form/signup_form_container.js';
import LandingPage from './landing_page/landing_page_container.jsx';

import { AuthRoute } from '../utils/route_util.jsx';
import { ProtectedRoute } from '../utils/route_util.jsx';

const ComponentWrapper = (props) => {
  return (
    <div>
      <Route exact path='/' component={LandingPage} />
      <AuthRoute path='/login' component={LoginForm} />
      <AuthRoute path='/signup' component={SignUpForm} />
    </div>
  );
};

export default ComponentWrapper;
