/* @flow */
import jsforce from 'jsforce';

export class SalesforceConnector {
  static _connection: jsforce.Connection;

  constructor() {
    if (!SalesforceConnector._connection) {
      SalesforceConnector.initConnection();
    }
  }

  getConnection(): jsforce.Connection {
    return SalesforceConnector._connection;
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

const connectors = {
  Salesforce: SalesforceConnector,
};

export default connectors;
