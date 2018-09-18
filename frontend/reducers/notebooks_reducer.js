import { RECEIVE_NOTEBOOKS_AND_NOTES, RECEIVE_NEW_NOTEBOOK, CLEAR_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';
import { RECEIVE_NEW_NOTE } from '../actions/note_actions.js';
import _ from 'lodash';

//default state is the empty Object
const notebooksReducer = (state = {}, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    //Add the notebooks to the store. Only called on initial run to notebooks page
    //So can replace entire old store
    case(RECEIVE_NOTEBOOKS_AND_NOTES):
      //the user has no notebooks, i.e. new User
      if (action.notebooks === undefined) {
        return {};
      }
      else {
        return action.notebooks;
      }
    case(RECEIVE_NEW_NOTE):
    //Add the new notes Id into the notes Array for the corresponding notebook
      const newState = Object.assign({}, state);
      const notebookId = action.note.notebook_id;
      newState[notebookId].notes.push(action.note.id);
      return newState;
    //When we create a new notebook
    case(RECEIVE_NEW_NOTEBOOK):
      const newState1 = Object.assign({}, state, {[action.notebook.id]: action.notebook});
      return newState1;
    //return an empty object to symbolize empty state, i.e. no notebooks
    case(CLEAR_NOTEBOOKS_AND_NOTES):
      return {};
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default notebooksReducer;
