import React from 'react';
import {
  Text,
} from 'react-native';
import gql from 'graphql-tag';

import {createFragment} from 'apollo-client';

export type SmallMovieInfo = {
  id: string,
  name: string
};

export const smallMovieInfoFragment = createFragment(gql`
  fragment SmallMovieInfo on Movie {
    id
    title
  }
`);

type MovieRowProps = {
  movie: SmallMovieInfo;
};

const MovieRow = (props: MovieRowProps): ?React.Element<*> => {
  const {movie} = props;
  return (
    <Text>{movie.title}</Text>
  );
};

export default MovieRow;
