import { RECEIVE_NOTEBOOKS_AND_NOTES, CLEAR_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';
import { RECEIVE_NEW_NOTE } from '../actions/note_actions.js';

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
      const newState = Object.assign({}, state, {[action.note.id]: action.note});
      return newState;
    //return an empty object to symbolize empty state, i.e. no notes
    case(CLEAR_NOTEBOOKS_AND_NOTES):
      return {};
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default notesReducer;
