// @flow

export type Actor = {
  id: string,
  name: string,
  pictureUrl: string,
  characters: Array<Character>,
} 

export type Character = {
  id: string,
  name: string,
  actor: Actor,
  movie: Movie,
}

export type Movie = {
  id: string,
  title: string,
  year: number,
  posterUrl: string,
  tagline: string,
  voteAverage: number,
  characters: Array<Character>,
}
