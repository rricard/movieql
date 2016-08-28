/* @flow */

import {assert} from 'chai';
import {graphql} from 'graphql';

import schema from '../schema';

const SAMUEL_L_JACKSON_ID = 'a010Y000000sp2dQAA';
const PULP_FICTION_ID = 'a000Y000001QexwQAC';

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
          id
          name
        }
      }
    `, {}, {}).then(({data}) => {
      const {actor} = data;
      assert(actor.id, SAMUEL_L_JACKSON_ID);
      assert(actor.name, 'Samuel L. Jackson');
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

  it('should be able to list movies', () => {
    return graphql(schema, `
      {
        movies {
          id
          title
          voteAverage
          voteCount
          posterUrl
        }
      }
    `, {}, {}).then(({data}) => {
      const {movies} = data;
      assert.isAtLeast(movies.length, 1);
      assert(
        movies.some(({title, id}) => title === 'Pulp Fiction' && id === PULP_FICTION_ID),
        '"Pulp Fiction" was not found in the movie list'
      );
    });
  });

  it('should be able to fetch a movies by it id', () => {
    return graphql(schema, `
      {
        movie(id:"${PULP_FICTION_ID}") {
          id
          title
          voteAverage
          voteCount
          posterUrl
        }
      }
    `, {}, {}).then(({data}) => {
      const {movie} = data;
      assert(movie.id, PULP_FICTION_ID);
      assert(movie.title, 'Pulp Fiction');      
    });
  });

  it('should be able to associate movies with their characters', () => {
    return graphql(schema, `
      {
        movie(id:"${PULP_FICTION_ID}") {
          title
          characters {
            id
            name
          }
        }
      }
    `, {}, {}).then(({data}) => {
      const characters = data.movie.characters; 
      assert.isAtLeast(characters.length, 1);
    });
  });
});
