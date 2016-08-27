/* @flow */
import jsforce from 'jsforce';
import fetch from 'isomorphic-fetch';

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
  fetchMovie(id: string) {
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
