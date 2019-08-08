import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const uri = "https://api.github.com/graphql";
const link = new HttpLink({
  uri,
  fetch,
  headers: { authorization: "Bearer 58872d0431b961d83377a66761f74670d25a60a6" }
});

export const makeQuery = operation => makePromise(execute(link, operation));
