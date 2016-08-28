/* @flow */

import {assert} from 'chai';
import {graphql} from 'graphql';

import schema from '../schema';

const SAMUEL_L_JACKSON_ID = 'a010Y000000sp2dQAA';

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
        actors.some(({name, id}) => name === 'Samuel L. Jackson' && id === SAMUEL_L_JACKSON_ID),
        '"Samuel L. Jackson" was not found in the actors list'
      );
    });
  });

  it('should be able to fetch actors by it id', () => {
    return graphql(schema, `
      {
        actor(id:"${SAMUEL_L_JACKSON_ID}") {
          name
        }
      }
    `, {}, {}).then(({data}) => {
      assert(data.actor.name, 'Samuel L. Jackson');
    });
  });

  it('should be able to associate actor with it characters', () => {
    return graphql(schema, `
      {
        actor(id:"${SAMUEL_L_JACKSON_ID}") {
          name
          characters {
            id
            name
          }
        }
      }
    `, {}, {}).then(({data}) => {
      const characters = data.actor.characters; 
      assert.isAtLeast(characters.length, 1);
    });
  });
});
