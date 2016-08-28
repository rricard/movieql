/* @flow */

import React from 'react';
import {
  Text,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

import AppView from './ui/AppView';

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
    return <AppView />;
  }
  return (
    <AppView>
      <Text>{data.actor.name}</Text>
    </AppView>
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
