/* @flow */

const mocks =  {
  RootQuery: () =>  ({
    movies: () => [{}],
  }),
  Movie: () => ({
    title: () => 'Pulp Fiction',
    year: () => 1991,
  }),
};

export default mocks;
