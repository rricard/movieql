/* @flow */

const definitions = `
  # Represents a Movie
  type Movie {
    # Title of the release
    title: String!
    # Year of the release
    year: Int!
  }

  # Root of the MovieQL schema definition
  type RootQuery {
    # Lists all movies in MovieQL
    movies: [Movie!]!
  }

  schema {
    query: RootQuery
  }
`;

export default definitions;
