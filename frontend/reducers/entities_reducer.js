import { combineReducers } from 'redux';
import usersReducer from './users_reducer.js';
import noteReducer from './note_reducer.js';
import notesReducer from './notes_reducer.js';
import notebooksReducer from './notebooks_reducer.js';

const entitiesReducer = combineReducers({
  user: usersReducer,
  note: noteReducer,
  notes: notesReducer,
  notebooks: notebooksReducer,
});

export default entitiesReducer;
