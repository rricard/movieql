/* @flow */

import React from 'react';
import {
  ListView,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import ActorRow, {
  smallActorInfoFragment,
} from './ActorRow';
import type {
  SmallActorInfo,
} from './ActorRow';
import AppView from './ui/AppView';

type ActorListProps = {
  data: {
    actors?: Array<SmallActorInfo>,
  },
};

class ActorList extends React.Component {
  props: ActorListProps;
  state: {
    dataSource: ListView.DataSource,
  };

  constructor(props: ActorListProps) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });
    this.state = {
      dataSource: ds.cloneWithRows(
        props.data.actors || [],
      ),
    };
  }

  componentWillReceiveProps(nextProps: ActorListProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        nextProps.data.actors || []
      ),
    });
  }
  
  render(): ?React.Element<*> {
    return (
      <AppView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={actor => 
            <ActorRow key={actor.id} actor={actor} />
          }
          enableEmptySections={true}
        />
      </AppView>
    );
  }
}

const ActorListWithData = graphql(gql`
  query getActors {
    actors {
      ...SmallActorInfo
    }
  }
`, {
  options: {
    fragments: smallActorInfoFragment,
  },
})(ActorList);

export default ActorListWithData;
