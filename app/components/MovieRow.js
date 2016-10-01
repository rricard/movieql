import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {createFragment} from 'apollo-client';

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
    height: 135,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
  },
  poster: {
    width: 90,
    height: 135,
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
        <Image
          style={styles.poster}
          source={{uri: movie.posterUrl}}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.tagline}>{movie.year}</Text>
          <View>
            {movie.characters.slice(0, 2).map(({id, actor}) =>
              <View key={id} style={styles.actor}>
                <Image
                  style={styles.actorFace}
                  source={{uri: actor.pictureUrl}}
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
      return dispatch();
    },
  }),
)(MovieRow);

export default MovieRowWithState;
