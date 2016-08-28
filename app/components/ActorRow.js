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

export type SmallActorInfo = {
  id: string,
  name: string
};

export const smallActorInfoFragment = createFragment(gql`
  fragment SmallActorInfo on Actor {
    id
    name
  }
`);

type ActorRowProps = {
  actor: SmallActorInfo,
  openActor: Function,
};

const ActorRow = (props: ActorRowProps): ?React.Element<*> => {
  const {actor, openActor} = props;
  return (
    <Text onPress={openActor}>{actor.name}</Text>
  );
};

const ActorRowWithState = connect(
  () => ({}),
  (dispatch, ownProps: ActorRowProps) => ({
    openActor() {
      const {name, id} = ownProps.actor;
      return dispatch(routerActions.push({
        name: 'actor',
        data: {
          title: name,
          id,
        },
      }));
    },
  }),
)(ActorRow);

export default ActorRowWithState;
