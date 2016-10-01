/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import { View, NavigationExperimental } from 'react-native';

import actorsImage from '../../assets/actor-icon.png';
import moviesImage from '../../assets/movie-icon.png';

import store from '../store';
import {popRoute} from '../actions';
import MovieList from './MovieList';
import ActorList from './ActorList';
import MovieDetail from './MovieDetail';
import ActorDetail from './ActorDetail';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;

type MovieQLProps = {
  navigationState: any,
};

const tabAssets = {
  actors: actorsImage,
  movies: moviesImage,
};

const SceneRenderer = (sceneProps) => {
  const {route: {key, id}} = sceneProps.scene;
  switch(key) {
    case 'MovieList': return <MovieList />;
    case 'MovieDetail': return <MovieDetail id={id} />;
    default: return <View />;
  }
};

const HeaderRenderer = (sceneProps) => {
  return <NavigationHeader
    onNavigateBack={() => store.dispatch(popRoute())}
    {...sceneProps}
  />;
};

const MovieQL = (props: MovieQLProps): ?React.Element<*> => {
  const {navigationState} = props;
  return (
    <NavigationCardStack
      navigationState={navigationState}
      renderHeader={HeaderRenderer}
      renderScene={SceneRenderer}
    />
  );
};

const MovieQLWithState = connect(
  (state) => ({
    navigationState: state.navigationState,
  }),
)(MovieQL);

export default MovieQLWithState;
