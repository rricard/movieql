/* @flow */
import Dataloader from 'dataloader';
import jsforce from 'jsforce';
import fetch from 'isomorphic-fetch';

import type {
  SFDCMovie,
  MovieDbMovie,
  MovieRecord,
} from './resolvers';

export class SalesforceConnector {
  static _connection: jsforce.Connection;

  constructor() {
    if (!SalesforceConnector._connection) {
      SalesforceConnector.initConnection();
    }
  }

  query(soqlQuery: string): Promise<Array<any>> {
    return SalesforceConnector._connection.query(soqlQuery)
      .then(({records}) => records);
  }

  queryOne(soqlQuery: string): Promise<any> {
    return this.query(soqlQuery)
      .then(records => records.pop());
  }

  static initConnection(): Promise<jsforce.Connection> {
    SalesforceConnector._connection = new jsforce.Connection();
    const username = process.env.SFDC_USERNAME;
    const password = process.env.SFDC_PWD_AND_TOKEN;
    if (username && password) {
      return SalesforceConnector._connection.login(username, password)
      .then(() => {
        console.info(`Connected to Salesforce as ${username ? username : 'Unknown'}`);
        return SalesforceConnector._connection;
      });
    }
    return Promise.reject(new Error(
      'Unable to find credentials for Salesforce (SFDC_USERNAME & SFDC_PWD_AND_TOKEN env variables)'
    ));
  }
}
SalesforceConnector.initConnection();

export class MovieDbConnector {
  _dataLoader: Dataloader;

  constructor() {
    this._dataLoader = new Dataloader(ids => this.fetchMovies(ids));
  }

  fetchMovies(ids: string[]) {
    return Promise.all(ids.map(id => this.fetchMovie(id)));
  }

  fetchMovie(id: string): Promise<MovieDbMovie> {
    const apiKey = process.env.MOVIE_DB_TOKEN;
    if (!apiKey) {
      return Promise.reject(new Error(
        'Unable to find credentials for MovieDB (MOVIE_DB_TOKEN env variable)'
      ));
    }

    const endpoint = `http://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    return fetch(endpoint)
      .then(response => response.json());
  }

  loadMovie(record: SFDCMovie): Promise<MovieRecord> {
    const {MovieDbId__c} = record;
    return this._dataLoader.load(MovieDbId__c)
      .then(movieDbRes => Object.assign({}, record, movieDbRes));
  }
}

export type SchemaConnectors = {
  Salesforce: SalesforceConnector,
  MovieDb: MovieDbConnector,  
}

const connectors = {
  Salesforce: SalesforceConnector,
  MovieDb: MovieDbConnector,
};

export default connectors;
