import { execute, makePromise, GraphQLRequest } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

export default class QueryHandler {
  link: HttpLink;

  constructor(uri: string | undefined, headers: any) {
    this.link = new HttpLink({
      uri,
      fetch: fetch as any,
      headers
    });
  }

  execute = (operation: GraphQLRequest) => makePromise(execute(this.link, operation));
}
