import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {
  actions as routerActions,
} from 'react-native-router-redux';
import {createFragment} from 'apollo-client';

import JpegImage from './ui/JpegImage';

type CharacterInMovie = {
  id: string,
  actor: {
    id: string,
    name: string,
    profileUrl: string,
  },
};

export type SmallMovieInfo = {
  id: string,
  title: string,
  year: number,
  characters: Array<CharacterInMovie>,
};

export const smallMovieInfoFragment = createFragment(gql`
  fragment SmallMovieInfo on Movie {
    id
    title
    year
    posterUrl
    characters {
      id
      actor {
        id
        name
        pictureUrl
      }
    }
  }
`);

const styles = StyleSheet.create({
  container: {
    height: 150,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    flexDirection: 'column',
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  tagline: {
    fontSize: 14,
    color: '#222',
    flex: 1,
  },
  actor: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },
  actorFace: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
});

type MovieRowProps = {
  movie: SmallMovieInfo,
  openMovie: Function,
};

const MovieRow = (props: MovieRowProps): ?React.Element<*> => {
  const {movie, openMovie} = props;
  return (
    <TouchableOpacity onPress={openMovie}>
      <View style={styles.container}>
        <JpegImage
          style={styles.poster}
          uri={movie.posterUrl}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.tagline}>{movie.year}</Text>
          <View>
            {movie.characters.slice(0, 2).map(({id, actor}) =>
              <View key={id} style={styles.actor}>
                <JpegImage
                  style={styles.actorFace}
                  uri={actor.pictureUrl}
                />
                <Text>{actor.name}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
