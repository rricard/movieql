/* @flow */

import {createStore, applyMiddleware, compose} from 'redux';

import apolloClient from './client';
import appReducer from './reducer';

const store = createStore(
  appReducer,
  compose(
    applyMiddleware(apolloClient.middleware()),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools() :
      noop => noop,
  ),
);

export default store;
