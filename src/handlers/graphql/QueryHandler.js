import { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

export default class QueryHandler {
  constructor(uri, headers) {
    this.link = new HttpLink({
      uri,
      fetch,
      headers
    });
  }

  execute = operation => makePromise(execute(this.link, operation));
}
