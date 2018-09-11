import { RECEIVE_USER, LOGOUT_USER } from '../actions/session_actions.js';

const nullUser = {
  id: null
};

const sessionReducer = (state = nullUser, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    //if we've logged in a user, store their id in the session slice of state
    case(RECEIVE_USER):
      return {id: action.user.id};
    //clear the user's ID when they log out
    case(LOGOUT_USER):
      return nullUser;
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default sessionReducer;
