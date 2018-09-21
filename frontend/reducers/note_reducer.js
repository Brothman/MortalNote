import { RECEIVE_NEW_NOTE, VIEW_NOTE, CLEAR_NOTE, DELETE_NOTE, RECEIVE_UPDATED_NOTE } from '../actions/note_actions.js';
import { CLEAR_NOTEBOOKS_AND_NOTES, RECEIVE_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';


//default state is the empty Object
const noteReducer = (state = {}, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    //a cheap way to clear the note on this action
    //signifies we're changing the notes and notebooks we're viewing
    //let one of our components dispatch an action to view the note
    case(RECEIVE_NOTEBOOKS_AND_NOTES):
      return {};
      //Add note to the Store when we receive a newly created note from the backend
      //Remove all old notes
    case(RECEIVE_NEW_NOTE):
    let newState1 = Object.assign({}, state);
    //ensure state isn't an empty object
    if (Object.keys(state).length > 0) {
      //ensure that the new note belongs to this notebook
      if (state.notebook_id === action.note.notebook_id) {
        return action.note;
      }
      //otherwise return the old state (we added a note to a notebook we aren't viewing)
      else {
        return newState1;
      }
    }
    else {
      return action.note;
    }
    case(VIEW_NOTE):
      return action.note;
    case(CLEAR_NOTE):
      return {};
    case(RECEIVE_UPDATED_NOTE):
      const newState = Object.assign({}, state);
      //if we don't yet have a note (empty object), or are updating the current note
      if( Object.keys(newState).length === 0 || newState.id === action.note.id ) {
        return action.note;
      }
    //return an empty object to symbolize empty state, i.e. no notes
    case(CLEAR_NOTEBOOKS_AND_NOTES):
      return {};
    case(DELETE_NOTE):
      return {};
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default noteReducer;
