/* @flow */

import ApolloClient, {
  createNetworkInterface,
} from 'apollo-client';

const GRAPHQL_ENDPOINT = __DEV__ ? 'http://localhost:3000/graphql' : 'https://movieql.herokuapp.com/graphql';

const networkInterface = createNetworkInterface(GRAPHQL_ENDPOINT);

const apolloClient = new ApolloClient({
  networkInterface,
  shouldBatch: true,
});

export default apolloClient;
