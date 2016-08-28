/* @flow */

declare module 'react-native-fetch-blob' {

  declare function fetch(method: string, uri: string, options?: any): Promise<any>;

  declare var exports: {
    fetch: fetch,
  };
}
