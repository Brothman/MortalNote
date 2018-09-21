export const RECEIVE_NEW_NOTE = "RECEIVE_NEW_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const VIEW_NOTE = "VIEW_NOTE";
export const RECEIVE_UPDATED_NOTE = "RECEIVE_UPDATED_NOTE";
export const CLEAR_NOTE = "CLEAR_NOTE";
import * as NoteAPIUtil from '../utils/note_api_util.js';

//Regular action creator, return a plain old Javascript object.
export const receiveNewNote = ( note ) => {
  return {
    type: RECEIVE_NEW_NOTE,
    note,
  };
};

//Regular action creator, return a plain old Javascript object.
export const viewNote = ( note ) => {
  return {
    type: VIEW_NOTE,
    note,
  };
};

//Regular action creator, return a plain old Javascript object.
export const removeNote = ( note ) => {
  return {
    type: DELETE_NOTE,
    note,
  };
};

//Regular action creator, return a plain old Javascript object.
export const receiveUpdatedNote = ( note ) => {
  return {
    type: RECEIVE_UPDATED_NOTE,
    note,
  };
};

//Regular action creator, return a plain old Javascript object.
export const clearNote = () => {
  return {
    type: CLEAR_NOTE,
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

//Return a function (Thunk Action Creator)
export const updateNote = (noteID, content, content_plain, title) => {
  return (dispatch) => {
    NoteAPIUtil.updateNote(noteID, content, content_plain, title)
    .then(
      (noteJSON) => dispatch(receiveUpdatedNote(noteJSON)),
      (error) => console.log(error)
    );
  };
};

//Return a function (Thunk Action Creator)
export const deleteNote = (noteID) => {
  return (dispatch) => {
    NoteAPIUtil.deleteNote(noteID)
    .then(
      (noteJSON) => dispatch(removeNote(noteJSON)),
      (error) => console.log(error)
    );
  };
};
