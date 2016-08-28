/* @flow */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

type ActorInfo = {
  id: string,
  name: string,
};

type ActorDetailProps = {
  id: string,
  data: {
    actor?: ActorInfo
  },
};

const ActorDetail = (props: ActorDetailProps): ?React.Element<*> => {
  const {data} = props;
  if (!data.actor) {
    return <View />;
  }
  return (
    <View>
      <Text>{data.actor.name}</Text>
    </View>
  );
};

const ActorDetailWithData = graphql(gql`
  query getActor($id: ID!) {
    actor(id: $id) {
      id
      name
    }
  }
`)(ActorDetail);

const ActorDetailWithDataAndState = connect(
  (state) => ({
    id: state.router.data.id || '',
  }),
)(ActorDetailWithData);

export default ActorDetailWithDataAndState;
