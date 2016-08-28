/* @flow */

import express from 'express';
import {
  apolloExpress,
  graphiqlExpress,
} from 'apollo-server';
import bodyParser from 'body-parser';

import schema from './schema';
import {
  createLoaders,
  initSfdcConnection,
} from './loaders';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const app = express();
initSfdcConnection().then(() => {
  app.use('/graphql', bodyParser.json(), apolloExpress({
    schema,
    context: {
      loaders: createLoaders(),
    },
    formatError: (error: Error) => {
      console.error('GraphQL execution error:', error.stack);
      return error.message;
    },
  }));
  
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen(PORT, () => console.info(`
    🎉 GraphQL endpoint available at http://${HOST}:${PORT}/graphql
    GraphiQL IDE available at http://${HOST}:${PORT}/graphiql
  `));
});
