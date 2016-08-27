/* @flow */

import {combineReducers} from 'redux';

import apolloClient from '../client';

const appReducer = combineReducers({
  apollo: apolloClient.reducer(),
});

export default appReducer;
