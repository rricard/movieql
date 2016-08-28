/* @flow */

import type { MovieQlLoaders } from './loaders';

type QueryContext = {
  loaders: MovieQlLoaders,
};

type ActorRecord = {
  Id: string,
  Name: string,
  profile_path: string,
};

type CharacterRecord = {
  Id: string,
  Name: string,
  Actor__c: string,
  Movie__c: string,
}

export type SFDCMovie = {
  Id: string,
  Name: string,
  Tagline__c: string,
  MovieDbId__c: string
}

export type MovieDbMovie = {
  original_title: string,
  poster_path: string,
  vote_count: number,
  vote_average: number,
}

export type MovieRecord = SFDCMovie & MovieDbMovie

const IMAGES_HOSTNAME = 'http://image.tmdb.org/t/p/';

const resolvers = {
  RootQuery: {
    movies: (_: any, __: any, {loaders}: QueryContext) => 
      loaders.allMovies(),

    movie: (_: any, {id}: any, {loaders}: QueryContext) =>
      loaders.movie.load(id),

    actors: (_: any, __: any, {loaders}: QueryContext) =>
      loaders.allActors(),

    actor: (_: any, {id}: any, {loaders}: QueryContext) =>
      loaders.actor.load(id),
  },
  Movie: {
    id: ({Id}: MovieRecord) => Id,
    title: ({Name}: MovieRecord) => Name,
    posterUrl: ({poster_path}: MovieRecord) => `${IMAGES_HOSTNAME}/w154/${poster_path}`,
    voteCount: ({vote_count}: MovieRecord) => vote_count,
    voteAverage: ({vote_average}: MovieRecord) => vote_average,

    characters: ({Id}: ActorRecord, _: any, {loaders}: QueryContext) => 
      loaders.charactersByMovie.load(Id),
  },
  Actor: { 
    id: ({Id}: ActorRecord) => Id,
    name: ({Name}: ActorRecord) => Name,
    pictureUrl: ({profile_path}: ActorRecord) => `${IMAGES_HOSTNAME}/w185/${profile_path}`,
    
    characters: ({Id}: ActorRecord, _: any, {loaders}: QueryContext) =>
      loaders.charactersByActor.load(Id),
  },
  Character: {
    id: ({Id}: CharacterRecord) => Id,
    name: ({Name}: CharacterRecord) => Name,

    actor: ({Actor__c}: CharacterRecord, _:any, {loaders}: QueryContext) =>
      loaders.actor.load(Actor__c),

    movie: ({Movie__c}: CharacterRecord, _:any, {loaders}: QueryContext) => 
      loaders.movie.load(Movie__c),
  },
};

export default resolvers;
