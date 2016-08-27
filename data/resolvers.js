/* @flow */

const resolvers = {
  RootQuery: {
    movies: () => [],
    movie: () => ({}),

    actors: () => [],
    actor: () => ({}),
  },
  Movie: {
    characters: () => [],
  },
  Actor: { 
    characters: () => [],
  },
  Character: {
    actor: () => ({}),
    movie: () => ({}),
  },
};

export default resolvers;
