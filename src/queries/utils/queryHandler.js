import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const uri = "https://api.github.com/graphql";
const link = new HttpLink({
  uri,
  fetch,
  headers: { authorization: "Bearer a1e67d3becca8ebf986c4260b49d128e021ade62" }
});

export const makeQuery = operation => makePromise(execute(link, operation));
