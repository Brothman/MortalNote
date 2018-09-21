import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/root_reducer.js';

// basic middleware package
const middlewares = [thunk];
//add redux logger if we're not in production
if (process.env.NODE_ENV !== "production") {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const configureStore = (preLoadedState = {}) => {
  return createStore(rootReducer,
                        preLoadedState,
                        applyMiddleware(...middlewares));
};

export default configureStore;
