/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const MovieQL = (): ?React.Element<*> => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        TODO
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default MovieQL;
