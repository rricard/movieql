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
} = NavigationExperimental;

type MovieQLProps = {
  navigationState: any,
};

const tabAssets = {
  actors: actorsImage,
  movies: moviesImage,
};

const SceneRenderer = (sceneProps) => {
  switch(sceneProps.scene.key) {
    default: return <View />;
  }
};

const MovieQL = (props: MovieQLProps): ?React.Element<*> => {
  const {navigationState} = props;
  return (
    <NavigationCardStack
      navigationState={navigationState}
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
