/* @flow */

const definitions = `
  # Represents a Movie
  type Movie {
    # Unique identifier for the movie
    id: ID!
    # Title of the release
    title: String!
    # Short description of the movie
    tagline: String!
    # Year of the release
    year: Int!
    # List of characters played
    characters: [Character!]!
    
    # Average vote between, in a range [0, 10]
    voteAverage: Float!
    # Number of vote that the movie received
    voteCount: Int!
    # URL of the movie poster
    posterUrl: String!
  }

  # Represents a human actor
  type Actor {
    # Unique identifier for the actor
    id: ID!
    # Actor full name
    name: String!
    # URL of the actor picture
    pictureUrl: String! 
    # Characters played by the actor
    characters: [Character!]!
  }

  # Represents a role played by a customer in a movie
  type Character {
    # Unique identifier for the character
    id: ID!
    # Actor playing the role
    actor: Actor!
    # Movie in which the role belong
    movie: Movie!
    # Character played by the action in the movie
    name: String! 
  }

  # Root of the MovieQL schema definition
  type RootQuery {
    # Lists all movies in MovieQL
    movies: [Movie!]!
    # Retrieve a movie by it id
    movie(id: ID!): Movie

    # Lists all actors in MovieQL
    actors: [Actor!]!
    # Retrieve an actor by it id
    actor(id: ID!): Actor
  }

  schema {
    query: RootQuery
  }
`;

export default definitions;
