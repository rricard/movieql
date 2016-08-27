/* @flow */

const mocks =  {
  RootQuery: () =>  ({
    movies: () => [{}],
    actors: () => [{}],
  }),
  Movie: () => ({
    title: () => 'Pulp Fiction',
    year: () => 1991,
    characters: () => [{}],
  }),
  Actor: () => ({
    name: () => 'John Travolta',
    characters: () => [{}],
  }),
  Character: () => ({
    actor: () => ({}),
    movie: () => ({}),
    name: () => 'Vincent Vega',
  }),
};

export default mocks;
