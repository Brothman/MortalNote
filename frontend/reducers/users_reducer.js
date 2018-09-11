import { RECEIVE_USER, LOGOUT_USER } from '../actions/session_actions.js';
import _ from 'lodash';

//default state is the empty object
const usersReducer = (state = {}, action) => {
  //Never mutate the original state in Redux
  Object.freeze(state);

  switch(action.type) {
    //if we've logged in a user, store their id in the session slice of state
    case(RECEIVE_USER):
      //create a new state so we don't mess up the old one
      const newState = Object.assign({}, state);
      //create a new user in a normalized fashion, so the id points to the
      //user object
      const newUser = {[action.user.id]: action.user};
      //return the newUser merged into the state
      return _.merge(newState, newUser);
    //clear the user's slice of state when they log out
    case(LOGOUT_USER):
      return {};
    //for most actions, do nothing and return the old state
    default:
      return state;
  }
};

export default usersReducer;
