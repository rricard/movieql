/* @flow */

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import typeDefs from './definitions';
import resolvers from './resolvers';
import mocks from './mocks';

const isMocked = process.env.MOCKED === 'true';


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

isMocked && addMockFunctionsToSchema({schema, mocks});

export default schema;
