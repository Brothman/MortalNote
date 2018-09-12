import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login_form/login_form_container.js';
import SignUpForm from './signup_form/signup_form_container.js';

const ComponentWrapper = (props) => {
  return (
    <div>
      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignUpForm} />
    </div>
  );
};

export default ComponentWrapper;
