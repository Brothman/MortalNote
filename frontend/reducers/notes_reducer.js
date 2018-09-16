import { RECEIVE_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';

//default state is the empty Object
const notesReducer = (state = {}, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    //Add the notes to the store. Includes all the users notes
    //So can replace entire old store
    case(RECEIVE_NOTEBOOKS_AND_NOTES):
      return action.notes;
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
}

export default notesReducer;
