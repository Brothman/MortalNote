import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login_form/login_form_container.js';
import SignUpForm from './signup_form/signup_form_container.js';
import LandingPage from './landing_page/landing_page_container.jsx';
import WhyMortalNote from './why_mortalnote/why_mortalnote_container.jsx';
import NotebooksContainer from './notebooks/notebooks_container.jsx';
import NotesContainer from './notes/notes_container.jsx';
import AboutUs from './about_us/about_us_container.jsx';
import Plans from './plans/plans_container.jsx';

import { AuthRoute } from '../utils/route_util.jsx';
import { ProtectedRoute } from '../utils/route_util.jsx';

const ComponentWrapper = (props) => {
  return (
    <div>
      <AuthRoute exact path='/' component={LandingPage} />
      <Route path="/why-mortalnote" component={WhyMortalNote} />
      <Route path="/plans" component={Plans} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="auth/:provider/callback" component={WhyMortalNote} />
      <AuthRoute path='/login' component={LoginForm} />
      <AuthRoute path='/signup' component={SignUpForm} />
      <ProtectedRoute path='/notebooks' component={NotebooksContainer} />
      <ProtectedRoute path='/notes' component={NotesContainer} />
      <ProtectedRoute path='/trash' component={NotesContainer} />
    </div>
  );
};

export default ComponentWrapper;
