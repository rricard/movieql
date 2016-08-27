/* @flow*/

import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
  Provider,
} from 'react-redux';
import {
  ApolloProvider,
} from 'react-apollo';

import store from './store';
import client from './client';
import MovieQL from './components/MovieQL';

const Application = () => (
  <Provider store={store}>
    <ApolloProvider store={store} client={client}>
      <MovieQL />
    </ApolloProvider>
  </Provider>
);

AppRegistry.registerComponent('movieql', () => Application);
