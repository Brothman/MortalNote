import { RECEIVE_NOTEBOOKS_AND_NOTES, CLEAR_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';
import { RECEIVE_NEW_NOTE, RECEIVE_UPDATED_NOTE, DELETE_NOTE } from '../actions/note_actions.js';

//default state is the empty Object
const notesReducer = (state = {}, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    case(RECEIVE_NOTEBOOKS_AND_NOTES):
    //if user has no notes, return empty object, clean slate
      if (action.notes === undefined) {
        return {};
      }
      //Otherwise add the notes to the store. Includes all the users notes
      //So can replace entire old store
      else {
        return action.notes;
      }
      //Add note to the Store when we receive a newly created note from the backend
    case(RECEIVE_NEW_NOTE):
      let newState = Object.assign({}, state);

        //if there's nothing in the state, put this note in the state
        if (Object.keys(state).length === 0) {
          return {[action.note.id]: action.note};
        }
        //ensure that the new note belongs to this notebook
        else if (state[Object.keys(state)[0]].notebook_id === action.note.notebook_id) {
          newState = Object.assign({}, state, {[action.note.id]: action.note});
          return newState;
        }
        //otherwise return the old state (we added a note to a notebook we aren't viewing)
        else {
          return newState;
        }
    case(RECEIVE_UPDATED_NOTE):
      const newState2 = Object.assign({}, state, {[action.note.id]: action.note});
      return newState2;
    //return an empty object to symbolize empty state, i.e. no notes
    case(CLEAR_NOTEBOOKS_AND_NOTES):
      return {};
    //for most actions, do nothing and return the old state
    case(DELETE_NOTE):
        const newState3 = Object.assign({}, state);
        //remove the deleted note from our notes state
        delete newState3[action.note.id];
        return newState3;
    default:
      return state;
  }
};

export default notesReducer;
