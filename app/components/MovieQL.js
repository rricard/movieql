/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  NavigationExperimental,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import actorsImage from '../../assets/actor-icon.png';
import moviesImage from '../../assets/movie-icon.png';

import store from '../store';
import {
  popRoute,
  movieRootRoute,
  actorRootRoute,
} from '../actions';
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
  selectMovies: Function,
  selectActors: Function,
};

const SceneRenderer = (sceneProps) => {
  const {route: {id, view}} = sceneProps.scene;
  switch(view) {
    case 'MovieList': return <MovieList />;
    case 'ActorList': return <ActorList />;
    case 'MovieDetail': return <MovieDetail id={id} />;
    case 'ActorDetail': return <ActorDetail id={id} />;
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
  const {navigationState, selectMovies, selectActors} = props;
  const cardStack = (
    <NavigationCardStack
      navigationState={navigationState}
      renderHeader={HeaderRenderer}
      renderScene={SceneRenderer}
    />
  );
  return (
    <TabNavigator sceneStyle={{paddingBottom: 0}}>
      <TabNavigator.Item
        title="Movies"
        renderIcon={() => <Image source={moviesImage} />}
        selected={navigationState.routes[0].view === 'MovieList'}
        onPress={selectMovies}
      >
        {cardStack}
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Actors"
        renderIcon={() => <Image source={actorsImage} />}
        selected={navigationState.routes[0].view === 'ActorList'}
        onPress={selectActors}
      >
        {cardStack}
      </TabNavigator.Item>
    </TabNavigator>
  );
};

const MovieQLWithState = connect(
  (state) => ({
    navigationState: state.navigationState,
  }),
  (dispatch) => ({
    selectMovies() {
      return dispatch(movieRootRoute());
    },
    selectActors() {
      return dispatch(actorRootRoute());
    },
  })
)(MovieQL);

export default MovieQLWithState;
