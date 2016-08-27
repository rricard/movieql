/* @flow */

require('dotenv').config();
require('babel-register');
const path = require('path');
const fs = require('fs');
const {graphql} = require('graphql');
const {introspectionQuery} = require('graphql/utilities');
const {default: schema} = require('../data/schema');

graphql(schema, introspectionQuery)
.then(({data}) => fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'schema.json'),
  JSON.stringify(data, null, ' ')
));
