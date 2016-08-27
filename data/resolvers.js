/* @flow */

import type {SalesforceConnector} from './connectors';

type QueryContext = {
  connectors: {
    Salesforce: SalesforceConnector,
  },
};

const resolvers = {
  RootQuery: {
    movies: () => [],
    movie: () => ({}),

    actors: (_: any, __: any, {connectors}: QueryContext) =>
      connectors.Salesforce.getConnection().query(`
        SELECT Id, Name FROM Actor__c
      `)
      .then(({records}) => records),
    actor: () => ({}),
  },
  Movie: {
    characters: () => [],
  },
  Actor: { 
    id: ({Id}) => Id,
    name: ({Name}) => Name,
    characters: () => [],
  },
  Character: {
    actor: () => ({}),
    movie: () => ({}),
  },
};

export default resolvers;
