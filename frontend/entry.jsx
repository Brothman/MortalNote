import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
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
      //the following logic will only run if we're editing the title of a note
      if (e.target.className == "note-title-input") {
        const editor = document.getElementsByClassName('ql-editor')[0];
        editor.focus();
        //break out of the function
        return;
      }
         focusable = form.find('input');
         next = focusable.eq(focusable.index(this)+1);
         //next.length will be 0 if there are no more inputs
         //the opacity check is to make sure we don't focus on hidden inputs.
        if (next.length !== 0 && getComputedStyle(next[0]).opacity != 0) {
            next.focus();
        } else {
          //for the addNotebook Modal
         if (form.find('button').context.className === "notebook-modal-input") {
           const submitNotebookButton = document.querySelectorAll("[class^=notebook-continue]")[0];
           submitNotebookButton.click();
         }
         //for regular Auth
         else {
           submit = form.find('button');
           submit.click();
           // form.submit();
         }
        }
        return false;
    }
});

//for the new note modal -- Even EVERNOTE doesn't have this feature!
document.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    const newNoteModal = document.getElementsByClassName('add-note-modal-card')[0];

    //check to see if newNoteModal exists -- for non-Note pages.
    if (newNoteModal && (newNoteModal.style.display !== "none" && newNoteModal.style.display !== "")) {
      // in case we're on the notes page, check both the [1] and [0] options
      const submitNotebookButton = document.querySelectorAll("[class^=notebook-continue]")[1] || document.querySelectorAll("[class^=notebook-continue]")[0];
      submitNotebookButton.click();
    }
  }

});

//JQUERY OVER

//begin bootstrapping the current user
let store;
if (window.currentUser) {
  //use some handy object destructuring
  const { currentUser } = window;
  const { id } = currentUser;

  const preloadedState = {
    entities: {
      user: {
        [id]: currentUser
      }
    },
    session: { id }
  };
  store = configureStore(preloadedState);

  //Cleaning up to ensure no one else has access to currentUser
  delete window.currentUser;
}
else {
  store = configureStore();
}

  //REMOVE THE FOLLOWING LINE BEFORE I DEPLOY FOR PRODUCTION
  window.getState = store.getState;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
