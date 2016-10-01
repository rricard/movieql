/* @flow */

import {combineReducers} from 'redux';

import apolloClient from '../client';
import {navigationState} from './navigationState';

const appReducer = combineReducers({
  apollo: apolloClient.reducer(),
  navigationState,
});

export default appReducer;
