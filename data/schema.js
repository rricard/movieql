/* @flow */

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import typeDefs from './definitions';
import resolvers from './resolvers';
import mocks from './mocks';

const isMocked = !process.env.MOVIE_DB_TOKEN ||
  !process.env.SFDC_PWD_AND_TOKEN ||
  !process.env.SFDC_USERNAME;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

isMocked && addMockFunctionsToSchema({schema, mocks});

export default schema;
