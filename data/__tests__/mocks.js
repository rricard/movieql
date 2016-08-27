/* @flow */

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import {assert} from 'chai';
import {graphql} from 'graphql';

import typeDefs from '../definitions';
import resolvers from '../resolvers';
import mocks from '../mocks';

describe('Schema Mocking', () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  addMockFunctionsToSchema({schema, mocks});

  it('should mock some movies', () => {
    return graphql(schema, `
      {
        movies {
          title
          year
        }
      }
    `)
    .then((res) => {
      assert.deepEqual(res, {
        data: {
          movies: [
            {
              title: 'Pulp Fiction',
              year: 1991,
            },
          ],
        },
      });
    });
  });
});
