export const RECEIVE_NOTEBOOKS_AND_NOTES = "RECEIVE_NOTEBOOKS_AND_NOTES";
export const RECEIVE_NEW_NOTEBOOK = "RECEIVE_NEW_NOTEBOOK";
export const CLEAR_NOTEBOOKS_AND_NOTES = "CLEAR_NOTEBOOKS_AND_NOTES";
import * as NotebookAPIUtil from '../utils/notebook_api_util.js';

//Regular action creator, return a plain old Javascript object.
//Destructure notes and notebooks out of the argument for cleaner code
export const receiveNotebooksAndNotes = ( { notebooks, notes } ) => {
  
  return {
    type: RECEIVE_NOTEBOOKS_AND_NOTES,
    notes,
    notebooks,
  };
};

//Regular action creator, return a plain old Javascript object.
export const receiveNewNotebook = ( notebook ) => {
  return {
    type: RECEIVE_NEW_NOTEBOOK,
    notebook,
  };
};

//Regular action creator, return a plain old Javascript object.
//Used to clear out Notebooks and Notes from the Store when logging out
export const clearNotebooksAndNotes = ( notebook ) => {
  return {
    type: CLEAR_NOTEBOOKS_AND_NOTES,
  };
};

//Return a function that takes a dispatch (Thunk Action)
//Then use an AJAX request to get our notebooks and notes from the database
//On success, call receiveNoteBooksAndNotes with the response to add the
//notebooks and notes to our web application's state/store.
export const fetchNotebooksAndNotes = () => {
  return (dispatch) => {
    NotebookAPIUtil.fetchNotebooksAndNotes()
    .then(
      (notebooksAndNotes) => dispatch(receiveNotebooksAndNotes(notebooksAndNotes)),
      (error) => console.log(error)
    )
  };
};

//Return a function that expects a dispatch as argument (Thunk Action)
export const createNotebook = (notebook) => {
  return (dispatch) => {
    NotebookAPIUtil.createNotebook(notebook)
    .then(
      (notebookJSON) => dispatch(receiveNewNotebook(notebookJSON)),
      (error) => console.log(error)
    )
  };
};
