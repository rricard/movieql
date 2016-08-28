/* @flow */

import express from 'express';
import {
  apolloExpress,
  graphiqlExpress,
} from 'apollo-server';
import bodyParser from 'body-parser';
import jsforce from 'jsforce';

import schema from './schema';
import {createLoaders} from './loaders';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const app = express();

// TODO: refactor later ==> this is dirty
const username = process.env.SFDC_USERNAME;
const password = process.env.SFDC_PWD_AND_TOKEN;
const movieDBToken = process.env.MOVIE_DB_TOKEN;

if (!movieDBToken && !username && !password) {
  throw new Error('Expect SFDC_USERNAME, SFDC_PWD_AND_TOKEN and MOVIE_DB_TOKEN to be set');
}

const sfdcConnection = new jsforce.Connection();
sfdcConnection.login(username, password)
  .then(() => console.info(`Connected to Salesforce as ${username ? username : 'Unknown'}`));

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema,
  context: {
    loaders: movieDBToken && sfdcConnection && createLoaders(sfdcConnection, movieDBToken),
  },
  formatError: (error: Error) => {
    console.error('GraphQL execution error:', error.stack);
    return error.message;
  }
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.info(`
  🎉 GraphQL endpoint available at http://${HOST}:${PORT}/graphql
  GraphiQL IDE available at http://${HOST}:${PORT}/graphiql
`));
