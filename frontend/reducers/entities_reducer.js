import { combineReducers } from 'redux';
import usersReducer from './users_reducer.js';
import notesReducer from './notes_reducer.js';
import notebooksReducer from './notebooks_reducer.js';

const entitiesReducer = combineReducers({
  user: usersReducer,
  notes: notesReducer,
  notebooks: notebooksReducer,
});

export default entitiesReducer;
