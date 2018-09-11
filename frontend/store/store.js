import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/root_reducer.js';

const configureStore = (preLoadedState = {}) => {
  return createStore(rootReducer,
                        preLoadedState,
                        applyMiddleware(thunk, logger));
};

export default configureStore;
