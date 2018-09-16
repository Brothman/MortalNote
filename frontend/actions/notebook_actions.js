export const RECEIVE_NOTEBOOKS_AND_NOTES = "RECEIVE_NOTEBOOKS_AND_NOTES";
import * as NotebookAPIUtil from '../utils/notebook_api_util.js';

//Regular action creator, return a plain old Javascript object.
//Destructure notes and notebooks out of the argument for cleaner code
export const receiveNotebooksAndNotes = ( { notebooks, notes }) => {
  return {
    type: RECEIVE_NOTEBOOKS_AND_NOTES,
    notes,
    notebooks,
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
