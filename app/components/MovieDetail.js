/* @flow */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

import AppView from './ui/AppView';
import {actorDetailRoute} from '../actions';
import type {
  Movie,
  Character,
} from '../types';

type MovieDetailProps = {
  id: string,
  data: {
    movie?: Movie
  },
  openActor: (character: Character) => any,
};

const styles = StyleSheet.create({
  movieHeader: {
    backgroundColor: '#111',
    padding: 10,
    flexDirection: 'row',
  },
  movieInfo: {
    flex: 1,
    marginLeft: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 20,
  },
  movieYear: {
    color: 'white',
  },
  movieTagline: {
    color: 'white',
    opacity: .9,
  },
  movieScore: {
    color: 'white',
    opacity: .9,
    fontSize: 10,
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
  },
  goodScore: {
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold',
  },
  badScore: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
  topCastHeader: {
    padding: 10,
    fontSize: 15,
  },
  character: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  isPlaying: {
    opacity: .7,
  },
  actorFace: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

const MovieDetail = (props: MovieDetailProps): ?React.Element<*> => {
  const {data, openActor} = props;
  if (!data.movie) {
    return <AppView />;
  }
  const {movie} = data;
  return (
    <AppView>
      <ScrollView>
        <View style={styles.movieHeader}>
          <Image
            style={styles.poster}
            source={{uri: movie.posterUrl}}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieYear}>{movie.year}</Text>
            <Text style={styles.movieTagline}>{movie.tagline}</Text>
            <Text style={styles.movieScore}>
              MovieDB score:{' '}
              <Text
                style={movie.voteAverage >= 6 ?
                  styles.goodScore :
                  styles.badScore
                }
              >
                {movie.voteAverage}
              </Text>
              /10
            </Text>
          </View>
        </View>
        <Text style={styles.topCastHeader}>Cast</Text>
        {(movie.characters || []).map(character =>
          <TouchableOpacity
            key={character.id}
            onPress={() => openActor(character)}
          >
            <View style={styles.character}>
              <Image
                style={styles.actorFace}
                source={{uri: character.actor.pictureUrl}}
              />
              <Text>
                {character.actor.name}
                <Text style={styles.isPlaying}> is playing </Text>
                {character.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppView>
  );
};

const MovieDetailWithData = graphql(gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      year
      posterUrl
      tagline
      voteAverage
      characters {
        id
        name
        actor {
          id
          pictureUrl
          name
        }
      }
    }
  }
`)(MovieDetail);

const MovieDetailWithDataAndState = connect(
  () => ({}),
  (dispatch) => ({
    openActor(character: Character) {
      const {name, id} = character.actor;
      return dispatch(actorDetailRoute(id, name));
    },
  }),
)(MovieDetailWithData);

export default MovieDetailWithDataAndState;
