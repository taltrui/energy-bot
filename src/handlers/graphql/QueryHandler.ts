import { execute, makePromise, GraphQLRequest } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

export default class QueryHandler {
  link: HttpLink;

  constructor(uri: string | undefined, headers: {[key: string]: string}) {
    this.link = new HttpLink({
      uri,
      fetch: fetch as never,
      headers,
    });
  }

  execute = (operation: GraphQLRequest): Promise<unknown> => makePromise(execute(this.link, operation));
}
