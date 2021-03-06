import { RECEIVE_NOTEBOOKS_AND_NOTES, RECEIVE_NEW_NOTEBOOK, CLEAR_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';
import { RECEIVE_NEW_NOTE, DELETE_NOTE, RECEIVE_DELETED_NOTES, RECEIVE_RESTORED_NOTE } from '../actions/note_actions.js';
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
      const newState = Object.assign({}, state);
      const notebookId = action.note.notebook_id;
      //Add the new notes Id into the notes Array for the corresponding notebook
      if (newState[notebookId]) {
        newState[notebookId].notes.push(action.note.id);
      }
      return newState;
    case(DELETE_NOTE):
      const newState2 = Object.assign({}, state);
      const notebookId1 = action.note.notebook_id;
      //Delete the new notes Id from the notes Array for the corresponding notebook
      if (newState2[notebookId1]) {
        const index = newState2[notebookId1].notes.indexOf(action.note.id);
        newState2[notebookId1].notes = newState2[notebookId1].notes.splice(index, 1);
      }
      return newState2;
    //When we create a new notebook
    case(RECEIVE_NEW_NOTEBOOK):
      const newState1 = Object.assign({}, state, {[action.notebook.id]: action.notebook});
      return newState1;
    //return a stubbed trash notebook for the trash page
    case (RECEIVE_DELETED_NOTES):
      return { 0: { title: "Trash", notes: [] } };
    case(RECEIVE_RESTORED_NOTE):
      const newState3 = Object.assign({}, state);
      const notebookId2 = action.note.notebook_id;
      //Delete the new notes Id from the notes Array for the corresponding notebook
      if (newState3[notebookId2]) {
        newState3[notebookId2].notes.push(action.note.id);
      }
      return newState3;
    //return an empty object to symbolize empty state, i.e. no notebooks
    case(CLEAR_NOTEBOOKS_AND_NOTES):
      return {};
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default notebooksReducer;
