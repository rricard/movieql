/* @flow */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 50,
  },
});

type AppViewProps = {
  children?: ?(React.Element<any>|Array<React.Element<any>>),
};

const AppView = (props: AppViewProps): ?React.Element<*> => {
  const {children} = props;
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default AppView;
