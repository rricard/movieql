import React from 'react';
import {
  Text,
} from 'react-native';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {
  actions as routerActions,
} from 'react-native-router-redux';

import {createFragment} from 'apollo-client';

export type SmallMovieInfo = {
  id: string,
  title: string
};

export const smallMovieInfoFragment = createFragment(gql`
  fragment SmallMovieInfo on Movie {
    id
    title
  }
`);

type MovieRowProps = {
  movie: SmallMovieInfo,
  openMovie: Function,
};

const MovieRow = (props: MovieRowProps): ?React.Element<*> => {
  const {movie, openMovie} = props;
  return (
    <Text onPress={openMovie}>{movie.title}</Text>
  );
};

const MovieRowWithState = connect(
  () => ({}),
  (dispatch, ownProps: MovieRowProps) => ({
    openMovie() {
      const {title, id} = ownProps.movie;
      return dispatch(routerActions.push({
        name: 'movie',
        data: {
          title,
          id,
        },
      }));
    },
  }),
)(MovieRow);

export default MovieRowWithState;
