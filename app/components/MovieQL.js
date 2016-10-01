/* @flow */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { View, NavigationExperimental } from 'react-native';

import actorsImage from '../../assets/actor-icon.png';
import moviesImage from '../../assets/movie-icon.png';

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
  const {route} = sceneProps.scene;
  switch(route.key) {
    case 'MovieList': return <MovieList />;
    default: return <View />;
  }
};

const HeaderRenderer = (sceneProps) => {
  return <NavigationHeader {...sceneProps} />;
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
