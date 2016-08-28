/* @flow */

import type { SchemaConnectors } from './connectors';

type QueryContext = {
  connectors: SchemaConnectors,
};

type ActorRecord = {
  Id: string,
  Name: string,
};

type CharacterRecord = {
  Id: string,
  Name: string,
  Actor__c: string,
  Movie__c: string,
}

export type MovieRecord = {
  Id: string,
  Name: string,
  Tagline__c: string,
  MovieDbId__c: string
}

const BASE_MOVIE_QUERY = `
  SELECT Id, Name, MovieDbId__c, Tagline__c 
  FROM Movie__c
`;

const BASE_ACTOR_QUERY = `
  SELECT Id, Name 
  FROM Actor__c
`;

const BASE_CHARACTER_QUERY = `
  SELECT Id, Name, Actor__c, Movie__c 
  FROM Role__c
`;

const resolvers = {
  RootQuery: {
    movies: (_: any, __: any, {connectors}: QueryContext) => 
      connectors.Salesforce.query(BASE_MOVIE_QUERY)
      .then((records:MovieRecord[]) => records.map(r => connectors.MovieDb.loadMovie(r))),

    movie: (_: any, {id}: any, {connectors}: QueryContext) =>
      connectors.Salesforce.queryOne(`
        ${BASE_MOVIE_QUERY}
        WHERE Id='${id}'
      `),

    actors: (_: any, __: any, {connectors}: QueryContext) =>
      connectors.Salesforce.query(BASE_ACTOR_QUERY),

    actor: (_: any, {id}: any, {connectors}: QueryContext) =>
      connectors.Salesforce.queryOne(`
        ${BASE_ACTOR_QUERY}
        WHERE Id='${id}'
      `),
  },
  Movie: {
    id: ({Id}: MovieRecord) => Id,
    title: ({Name}: MovieRecord) => Name,
    posterUrl: ({poster_path}) => poster_path,
    voteCount: ({vote_count}) => vote_count,
    voteAverage: ({vote_average}) => vote_average,

    characters: ({Id}: ActorRecord, _: any, {connectors}: QueryContext) => 
      connectors.Salesforce.query(`
        ${BASE_CHARACTER_QUERY}
        WHERE Movie__c='${Id}'
      `),
  },
  Actor: { 
    id: ({Id}: ActorRecord) => Id,
    name: ({Name}: ActorRecord) => Name,
    
    characters: ({Id}: ActorRecord, _: any, {connectors}: QueryContext) => 
      connectors.Salesforce.query(`
        ${BASE_CHARACTER_QUERY}
        WHERE Actor__c='${Id}'
      `),
  },
  Character: {
    id: ({Id}: CharacterRecord) => Id,
    name: ({Name}: CharacterRecord) => Name,

    actor: ({Actor__c}: CharacterRecord, _:any, {connectors}: QueryContext) =>
      connectors.Salesforce.queryOne(`
        ${BASE_ACTOR_QUERY}
        WHERE Id='${Actor__c}'
      `),

    movie: ({Movie__c}: CharacterRecord, _:any, {connectors}: QueryContext) => 
      connectors.Salesforce.queryOne(`
        ${BASE_MOVIE_QUERY}
        WHERE Id='${Movie__c}'
      `),
  },
};

export default resolvers;
