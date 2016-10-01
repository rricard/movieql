import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import gql from 'graphql-tag';
import {connect} from 'react-redux';

import {createFragment} from 'apollo-client';

import {
  actorDetailRoute,
} from '../actions';

export type SmallActorInfo = {
  id: string,
  name: string
};

export const smallActorInfoFragment = createFragment(gql`
  fragment SmallActorInfo on Actor {
    id
    name
    pictureUrl
    characters {
      id
      movie {
        title
      }
    }
  }
`);

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actorPicture: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
  },
  info: {
    flexDirection: 'column',
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  movie: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

type ActorRowProps = {
  actor: SmallActorInfo,
  openActor: Function,
};

const ActorRow = (props: ActorRowProps): ?React.Element<*> => {
  const {actor, openActor} = props;
  return (
    <TouchableOpacity onPress={openActor}>
      <View style={styles.container}>
        <Image
          style={styles.actorPicture}
          source={{uri: actor.pictureUrl}}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{actor.name}</Text>
          <View>
            {actor.characters.slice(0, 2).map(({id, movie}) =>
              <View key={id} style={styles.movie}>
                <Text>{movie.title}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ActorRowWithState = connect(
  () => ({}),
  (dispatch, ownProps: ActorRowProps) => ({
    openActor() {
      const {name, id} = ownProps.actor;
      return dispatch(actorDetailRoute(id, name));
    },
  }),
)(ActorRow);

export default ActorRowWithState;
