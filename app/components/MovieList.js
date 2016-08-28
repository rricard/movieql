/* @flow */

import React from 'react';
import {
  ListView,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import MovieRow, {
  smallMovieInfoFragment,
} from './MovieRow';
import type {
  SmallMovieInfo,
} from './MovieRow';

type MovieListProps = {
  data: {
    movies?: Array<SmallMovieInfo>,
  },
};

class MovieList extends React.Component {
  props: MovieListProps;
  state: {
    dataSource: ListView.DataSource,
  };

  constructor(props: MovieListProps) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });
    this.state = {
      dataSource: ds.cloneWithRows(
        props.data.movies || [],
      ),
    };
  }

  componentWillReceiveProps(nextProps: MovieListProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        nextProps.data.movies || []
      ),
    });
  }
  

  render(): ?React.Element<*> {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={movie => 
          <MovieRow key={movie.id} movie={movie} />
        }
        enableEmptySections={true}
      />
    );
  }
}

const MovieListWithData = graphql(gql`
  query getMovies {
    movies {
      ...SmallMovieInfo
    }
  }
`, {
  options: {
    fragments: smallMovieInfoFragment,
  },
})(MovieList);

export default MovieListWithData;
