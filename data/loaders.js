/* @flow */
import Dataloader from 'dataloader';
import jsforce from 'jsforce';
import fetch from 'isomorphic-fetch';

type SfdcRecord = {
  Id: string,
  MovieDbId__c: string,
}

export type MovieQlLoaders = {
  sfdc: Dataloader,

  allMovies: () => Promise<Array<SfdcRecord>>,
  movie: Dataloader,

  allActors: () => Promise<Array<SfdcRecord>>,
  actor: Dataloader,

  charactersByMovie: Dataloader,
  charactersByActor: Dataloader,
}

const MOVIE_DB_API = 'http://api.themoviedb.org/3';

const BASE_MOVIE_QUERY = `
  SELECT Id, Name, MovieDbId__c, Year__c 
  FROM Movie__c
`;

const BASE_ACTOR_QUERY = `
  SELECT Id, Name, MovieDbId__c
  FROM Actor__c
`;

const BASE_CHARACTER_QUERY = `
  SELECT Id, Name, Actor__c, Movie__c 
  FROM Role__c
`;

function formatIds(ids: string[]): string {
  return ids.map(id => `'${id}'`).join(', ');
}

function reorderRecord(sortedIds:string[], records:SfdcRecord[]): SfdcRecord[] {
  if (!sortedIds.length) {
    return records;
  }

  return sortedIds.map(id => 
    records.find(record => record.Id === id)
  );
}

function augmentRecordWithMovieDb(records: Array<SfdcRecord>, movieDbLoader: Dataloader): Array<SfdcRecord> {
  const movieDBIds = records.map(({MovieDbId__c}) => MovieDbId__c);

  return movieDbLoader.loadMany(movieDBIds).then(movieInfos => 
    records.map((record, index) => 
      Object.assign({}, record, movieInfos[index])
    )
  );
}

function executeSoql(queries: string[], sfdcConnection: jsforce.Connection): Promise<SfdcRecord[]> {
  return Promise.all(
    queries.map(query => sfdcConnection
      .query(query)
      .then(({records}) => records)
    )
  );
}

function fetchMovieDb(ids:string[], entity:string, token:string): Promise<any[]> {
  const fetchFromApi = id => 
    fetch(`${MOVIE_DB_API}/${entity}/${id}?api_key=${token}`)
      .then(response => response.json());
  
  return Promise.all(ids.map(fetchFromApi));
}

function fetchMovies(ids:string[], soqlDataLoader:Dataloader, movieDbLoader:Dataloader): Promise<Array<SfdcRecord>> {
  let whereCondition = ids.length ? `WHERE Id IN (${formatIds(ids)})` : '';
  return soqlDataLoader.load(`
    ${BASE_MOVIE_QUERY}
    ${whereCondition}
  `)
  .then(records =>
    augmentRecordWithMovieDb(
      reorderRecord(ids, records), 
      movieDbLoader,
    )
  );
}

function fetchActors(ids:string[], soqlDataLoader:Dataloader, movieDbLoader:Dataloader): Promise<Array<SfdcRecord>> {
  let whereCondition = ids.length ? `WHERE Id IN (${formatIds(ids)})` : '';
  return soqlDataLoader.load(`
    ${BASE_ACTOR_QUERY}
    ${whereCondition}
  `)
  .then(records =>
    augmentRecordWithMovieDb(
      reorderRecord(ids, records), 
      movieDbLoader,
    )
  );
}

function fetchCharactersByMovie(movieIds, soqlDataLoader) {
  return soqlDataLoader.load(`
    ${BASE_CHARACTER_QUERY}
    WHERE Movie__c IN (${formatIds(movieIds)})
  `).then(records => {
    return movieIds.map(movieId =>
       records.filter(({Movie__c}) => Movie__c === movieId)
    );
  });
}

function fetchCharactersByActor(actorIds, soqlDataLoader) {
  return soqlDataLoader.load(`
    ${BASE_CHARACTER_QUERY}
    WHERE Actor__c IN (${formatIds(actorIds)})
  `).then(records => {
    return actorIds.map(actorId =>
       records.filter(({Actor__c}) => Actor__c === actorId)
    );
  });
}

let salesforceConnection = null; 

export function initSfdcConnection() {
  const username = process.env.SFDC_USERNAME;
  const password = process.env.SFDC_PWD_AND_TOKEN;
  if (!username && !password) {
    throw new Error('Expect SFDC_USERNAME and SFDC_PWD_AND_TOKEN to be set');
  }

  let connection = new jsforce.Connection();
  return connection.login(username, password).then(() => {
    console.info(`Connected to Salesforce as ${username ? username : 'Unknown'}`);
    salesforceConnection = connection;
  });
}

export function createLoaders(): MovieQlLoaders {
  const movieDBToken = process.env.MOVIE_DB_TOKEN;
  if (!movieDBToken) {
    throw new Error('Expect MovieDB token');
  }

  if (!salesforceConnection) {
    throw new Error('Connection with SFDC has not been initalized, need to call first "initSfdcConnection"');
  }

  const soqlDataLoader = new Dataloader(queries => 
    executeSoql(queries, salesforceConnection)
  );

  const movieDBMovieLoader = new Dataloader(ids =>
    fetchMovieDb(ids, 'movie', movieDBToken)
  );

  const actorDBMovieLoader = new Dataloader(ids =>
    fetchMovieDb(ids, 'person', movieDBToken)
  );

  return {
    sfdc: soqlDataLoader,

    allMovies: () => fetchMovies([], soqlDataLoader, movieDBMovieLoader),
    movie: new Dataloader(ids => fetchMovies(ids, soqlDataLoader, movieDBMovieLoader)),

    allActors: () => fetchActors([], soqlDataLoader, actorDBMovieLoader),
    actor: new Dataloader(ids => fetchActors(ids, soqlDataLoader, actorDBMovieLoader)),

    charactersByMovie: new Dataloader(ids => fetchCharactersByMovie(ids, soqlDataLoader)),
    charactersByActor: new Dataloader(ids => fetchCharactersByActor(ids, soqlDataLoader)),
  };
}
