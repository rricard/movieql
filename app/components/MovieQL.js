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

import MovieList from './MovieList';
import ActorList from './ActorList';

type MovieQLProps = {
  router: any,
  actions: any,
  dispatch: (action: any) => any,
};

const MovieQL = (props: MovieQLProps): ?React.Element<*> => {
  const {router, actions, dispatch} = props;
  return (
    <Router {...{router, actions, dispatch}} initial="movies">
      <Schema 
        name="default"
        navBar={NavBar}
        tabBar={TabBar}
      />

      <TabRoute name="tabBar">
        <Route
          name="movies"
          component={MovieList}
          title="Movies"
          tabItem={{title: 'Movies'}}
        />
        <Route
          name="actors"
          component={ActorList}
          title="Actors"
          tabItem={{title: 'Actors'}}
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
