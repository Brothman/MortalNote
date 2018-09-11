export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

//signup, login, and logout are the three methods we want from SessionAPIUtil
import * as SessionAPIUtil from '../utils/session_api_util.js';

//Regular Action Creator, i.e. returns a POJO, 'Plain Old Javascript Object'
export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_USER,
    user: currentUser,
  };
};

//Regular Action Creator
export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

//Regular Action Creator
export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    //shortcut for errors: errors
    errors,
  };
};

//Thunk Action Creator, i.e. returns a function
export const login = (user) => {
  return (dispatch) => {
    SessionAPIUtil.login(user)
    .then(
      //on success, add the current user to the state
      (jsonUser) => dispatch(receiveCurrentUser(jsonUser)),
      //errback, i.e. error callback to be called on failure
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

//Thunk Action Creator
export const logout = () => {
  return (dispatch) => {
    SessionAPIUtil.logout()
    .then(
      //on success, logout
      () => dispatch(logoutCurrentUser()),
      //errback, i.e. error callback to be called on failure
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

//Thunk Action Creator
export const signup = (user) => {
  return (dispatch) => {
    SessionAPIUtil.signup(user)
    .then(
      //on success, add the current user to the state
      (jsonUser) => dispatch(receiveCurrentUser(jsonUser)),
      //errback, i.e. error callback to be called on failure
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
