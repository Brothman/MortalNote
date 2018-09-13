import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.jsx';
import configureStore from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {

  /* The following JQuery is added to allow users to hit enter and move to
  the next input field, until no input fields remain, in which case the
  user submits the form. */

  $('body').on('keydown', 'input', function(e) {
    //this is the element that the enter call occured on.
    let self = $(this);
    //find the form
    let form = self.parents('form:eq(0)');
    //define variables
    let focusable, next, submit;

    //13 is the keyCode for 'enter/return'
    if (e.keyCode == 13) {
         focusable = form.find('input');
         next = focusable.eq(focusable.index(this)+1);
         //next.length will be 0 if there are no more inputs
         //the opacity check is to make sure we don't focus on hidden inputs.
        if (next.length !== 0 && getComputedStyle(next[0]).opacity != 0) {
            next.focus();
        } else {
          submit = form.find('button');
          submit.click();
            // form.submit();
        }
        return false;
    }
});

//JQUERY OVER

  const store = configureStore();
  //REMOVE THE FOLLOWING LINE BEFORE I DEPLOY FOR PRODUCTION
  window.getState = store.getState;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
