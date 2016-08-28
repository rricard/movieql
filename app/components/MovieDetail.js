/* @flow */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

type MovieInfo = {
  id: string,
  title: string,
};

type MovieDetailProps = {
  id: string,
  data: {
    movie?: MovieInfo
  },
};

const MovieDetail = (props: MovieDetailProps): ?React.Element<*> => {
  const {data} = props;
  if (!data.movie) {
    return <View />;
  }
  return (
    <View>
      <Text>{data.movie.title}</Text>
    </View>
  );
};

const MovieDetailWithData = graphql(gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      id
      title
    }
  }
`)(MovieDetail);

const MovieDetailWithDataAndState = connect(
  (state) => ({
    id: state.router.data.id || '',
  }),
)(MovieDetailWithData);

export default MovieDetailWithDataAndState;
