/* @flow */

const definitions = `
  # Represents a Movie
  type Movie {
    # Title of the release
    title: String!
    # Year of the release
    year: Int!
    # List of characters played
    characters: [Character!]!
  }

  # Represents a human actor
  type Actor {
    # Actor full name
    name: String! 
    # Characters played by the actor
    characters: [Character!]!
  }

  # Represents a role played by a customer in a movie
  type Character {
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
