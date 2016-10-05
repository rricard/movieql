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

function logIncomingGraphQL(req, res, next) {
  console.info('❓️️ Incoming GraphQL Query');
  console.info('-------------------------');
  console.info(req.body.query);
  console.info('');
  console.info('');
  next();
}

const app = express();
initSfdcConnection().then(() => {
  app.use('/graphql', bodyParser.json(), logIncomingGraphQL, apolloExpress({
    schema,
    context: {
      loaders: createLoaders(),
    },
    formatError: (error: Error) => {
      console.error('GraphQL execution error:', error.stack);
      return error.message;
    },
    formatResponse: (data: any) => {
      console.info('✅ Outgoing GraphQL Response');
      console.info('----------------------------');
      console.info(JSON.stringify(data, null, ' '));
      console.info('');
      console.info('');
      return data;
    }
  }));
  
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen(PORT, () => console.info(`
    🎉 GraphQL endpoint available at http://${HOST}:${PORT}/graphql
    GraphiQL IDE available at http://${HOST}:${PORT}/graphiql
  `));
});
