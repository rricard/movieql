/* @flow */

import {assert} from 'chai';
import {graphql} from 'graphql';

import schema from '../schema';

describe('GraphQL Schema', () => {
  it('should be able to list some badass actors', () => {
    return graphql(schema, `
      {
        actors {
          id
          name
        }
      }
    `, {}, {}).then(({data}) => {
      const {actors} = data;
      assert.isAtLeast(actors.length, 1);
      assert(
        actors.some(({name}) => name === 'Samuel L. Jackson'),
        '"Samuel L. Jackson" was not found in the actors list'
      );
    });
  });
});
