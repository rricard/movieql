/* @flow */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute,
} from 'react-native-router-redux';
import actorsImage from '../../assets/actor-icon.png';
import moviesImage from '../../assets/movie-icon.png';

import MovieList from './MovieList';
import ActorList from './ActorList';
import MovieDetail from './MovieDetail';
import ActorDetail from './ActorDetail';

type MovieQLProps = {
  router: any,
  actions: any,
  dispatch: (action: any) => any,
};

const tabAssets = {
  actors: actorsImage,
  movies: moviesImage,
};

const MovieQL = (props: MovieQLProps): ?React.Element<*> => {
  const {router, actions, dispatch} = props;
  return (
    <Router {...{router, actions, dispatch}} initial="movies" assets={tabAssets}>
      <Schema 
        name="default"
        navBar={NavBar}
        tabBar={TabBar}
        navTint="#FAFAFA"
      />

      <Route
        name="movie"
        component={MovieDetail}
        title="Movie"
      />
      <Route
        name="actor"
        component={ActorDetail}
        title="Actor"
      />
      <TabRoute name="tabBar" tint="#32DEAF">
        <Route
          name="movies"
          component={MovieList}
          title="Movies"
          tabItem={{title: 'Movies', icon: tabAssets.movies}}
        />
        <Route
          name="actors"
          component={ActorList}
          title="Actors"
          tabItem={{title: 'Actors', icon: tabAssets.actors}}
        />
      </TabRoute>
    </Router>
  );
};

const MovieQLWithState = connect(
  (state) => ({
    router: state.router,
  }),
  (dispatch) => ({
    actions: bindActionCreators({
      ...routerActions,
    }, dispatch),
    dispatch,
  })
)(MovieQL);

export default MovieQLWithState;
