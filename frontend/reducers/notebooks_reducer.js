import { RECEIVE_NOTEBOOKS_AND_NOTES } from '../actions/notebook_actions.js';

//default state is the empty Object
const notebooksReducer = (state = {}, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    //Add the notebooks to the store. Only called on initial run to notebooks page
    //So can replace entire old store
    case(RECEIVE_NOTEBOOKS_AND_NOTES):
      return action.notebooks;
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
}

export default notebooksReducer;
