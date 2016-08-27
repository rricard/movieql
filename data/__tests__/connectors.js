/* @flow */
import {assert} from 'chai';

import {
  SalesforceConnector,
  MovieDbConnector,
} from '../connectors';

describe('GraphQL backend connectors', () => {
  describe('SalesforceConnector', () => {
    it('should be able to connect and query Salesforce', () => {
      return SalesforceConnector.initConnection()
      .then(() => {
        const connector = new SalesforceConnector();
        return connector.query(`
          SELECT Id, Name FROM Actor__c
        `);
      })
      .then(records =>
        assert.isAtLeast(records.length, 1)
      );
    });
  });

  describe('MovieDbConnector', () => {
    it('should be able to fetch movie informations', () => {
      const connector = new MovieDbConnector();
      return connector.fetchMovie('680')
        .then(({original_title}) => 
          assert(original_title, 'Pulp Fiction')
        );
    });
  });
});
