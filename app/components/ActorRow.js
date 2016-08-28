import React from 'react';
import {
  Text,
} from 'react-native';
import gql from 'graphql-tag';

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
  actor: SmallActorInfo;
};

const ActorRow = (props: ActorRowProps): ?React.Element<*> => {
  const {actor} = props;
  return (
    <Text>{actor.name}</Text>
  );
};

export default ActorRow;
