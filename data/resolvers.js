/* @flow */

import type {SalesforceConnector} from './connectors';

type QueryContext = {
  connectors: {
    Salesforce: SalesforceConnector,
  },
};

type ActorRecord = {
  Id: string,
  Name: string,
};

const resolvers = {
  RootQuery: {
    movies: () => [],
    movie: () => ({}),

    actors: (_: any, __: any, {connectors}: QueryContext) =>
      connectors.Salesforce.query(`
        SELECT Id, Name FROM Actor__c
      `),
    actor: () => ({}),
  },
  Movie: {
    characters: () => [],
  },
  Actor: { 
    id: ({Id}: ActorRecord) => Id,
    name: ({Name}: ActorRecord) => Name,
    characters: () => [],
  },
  Character: {
    actor: () => ({}),
    movie: () => ({}),
  },
};

export default resolvers;
