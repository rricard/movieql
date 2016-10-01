/* @flow */

import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

import {movieDetailRoute} from '../actions';
import AppView from './ui/AppView';
import type {
  Actor,
  Character,
} from '../types';

type ActorDetailProps = {
  id: string,
  data: {
    actor?: Actor
  },
  openMovie: (character: Character) => any,
};

const styles = StyleSheet.create({
  actorHeader: {
    backgroundColor: '#111',
    padding: 10,
    flexDirection: 'row',
  },
  picture: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
  },
  actorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  actorName: {
    color: 'white',
    fontSize: 20,
  },
  actingHeader: {
    padding: 10,
    fontSize: 15,
  },
  acting: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  actingSecondary: {
    opacity: .7,
  },
});

const ActorDetail = (props: ActorDetailProps): ?React.Element<*> => {
  const {data, openMovie} = props;
  if (!data.actor) {
    return <AppView />;
  }
  const {actor} = data;
  return (
    <AppView>
      <ScrollView>
        <View style={styles.actorHeader}>
          <Image
            style={styles.picture}
            uri={actor.pictureUrl}
          />
          <View style={styles.actorInfo}>
            <Text style={styles.actorName}>{actor.name}</Text>
          </View>
        </View>
        <Text style={styles.actingHeader}>Acting</Text>
        {(actor.characters || []).map(character =>
          <TouchableOpacity 
            key={character.id}
            onPress={() => openMovie(character)}>
            <View style={styles.acting}>
              <Text>
                <Text style={styles.actingSecondary}>Playing </Text>
                {character.name}
                <Text style={styles.actingSecondary}> in </Text>
                {character.movie.title}
              </Text>
            </View> 
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppView>
  );
};

const ActorDetailWithData = graphql(gql`
  query getActor($id: ID!) {
    actor(id: $id) {
      id
      name
      pictureUrl
      characters {
        id
        name
        movie {
          title
          id
        }
      }
    }
  }
`)(ActorDetail);

const ActorDetailWithDataAndState = connect(
  () => ({}),
  (dispatch) => ({
    openMovie(character: Character) {
      const {title, id} = character.movie;
      return dispatch(movieDetailRoute(id, title));
    }, 
  })
)(ActorDetailWithData);

export default ActorDetailWithDataAndState;
