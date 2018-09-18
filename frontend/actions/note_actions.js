export const RECEIVE_NEW_NOTE = "RECEIVE_NEW_NOTE";
import * as NoteAPIUtil from '../utils/note_api_util.js';

//Regular action creator, return a plain old Javascript object.
export const receiveNewNote = ( note ) => {
  return {
    type: RECEIVE_NEW_NOTE,
    note,
  };
};


//Return a function that expects a dispatch as argument (Thunk Action)
export const createNote = (note) => {
  return (dispatch) => {
    NoteAPIUtil.createNote(note)
    .then(
      (noteJSON) => dispatch(receiveNewNote(noteJSON)),
      (error) => console.log(error)
    );
  };
};
