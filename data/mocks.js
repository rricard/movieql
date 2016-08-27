/* @flow */

const mocks =  {
  RootQuery: () =>  ({
    movies: () => [{}],
    actors: () => [{}],
  }),
  Movie: () => ({
    title: () => 'Pulp Fiction',
    year: () => 1991,
    voteAverage: () => 7.7,
    voteCount: () => 12000,
    posterUrl: () => 'http://sarceforce.com/pulp-fiction.jpg',
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
