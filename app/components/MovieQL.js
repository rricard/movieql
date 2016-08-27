/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rawData: {
    fontSize: 14,
    fontFamily: 'Menlo',
    margin: 10,
  },
});

type MovieQLProps = {
  data: {
    actors: Array<{id: string, title: string}>,
  },
};

const MovieQL = (props: MovieQLProps): ?React.Element<*> => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.rawData}>
      {JSON.stringify(data.actors, null, ' ')}
      </Text>
    </View>
  );
};

const MovieQLWithData = graphql(gql`
  {
    actors {
      id
      name
    }
  }
`)(MovieQL);

export default MovieQLWithData;
