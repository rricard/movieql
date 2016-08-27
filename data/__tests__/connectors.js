/* @flow */

import {SalesforceConnector} from '../connectors';
import {assert} from 'chai';

describe('GraphQL backend connectors', () => {
  describe('SalesforceConnector', () => {
    it('should be able to connect and query Salesforce', () => {
      return SalesforceConnector.initConnection()
      .then(() => {
        const connector = new SalesforceConnector();
        return connector.getConnection().query(`
          SELECT Id, Name FROM Actor__c
        `);
      })
      .then(({records}) =>
        assert.isAtLeast(records.length, 1)
      );
    });
  });
});
