import { combineReducers } from 'redux';
import usersReducer from './users_reducer.js';

const entitiesReducer = combineReducers({
  user: usersReducer,
});

export default entitiesReducer;
