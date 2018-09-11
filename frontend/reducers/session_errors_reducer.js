import { RECEIVE_ERRORS, RECEIVE_USER } from '../actions/session_actions.js';

const sessionErrorsReducer = (state = [], action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);
  switch(action.type) {
    //if we've logged in a user, remove all errors
    case(RECEIVE_USER):
      return [];
    //add the errors to the sessionErrors slice of state
    case(RECEIVE_ERRORS):
      return action.errors;
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default sessionErrorsReducer;
