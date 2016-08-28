/* @flow */

import {combineReducers} from 'redux';
import { reducer as router } from 'react-native-router-redux';

import apolloClient from '../client';

const appReducer = combineReducers({
  apollo: apolloClient.reducer(),
  router,
});

export default appReducer;
