/* @flow */

import express from 'express';
import {
  apolloExpress,
  graphiqlExpress,
} from 'apollo-server';
import bodyParser from 'body-parser';

import schema from './schema';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema,
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.info(`
  🎉 GraphQL endpoint available at http://${HOST}:${PORT}/graphql
  GraphiQL IDE available at http://${HOST}:${PORT}/graphiql
`));
