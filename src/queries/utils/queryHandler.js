import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const uri = "https://api.github.com/graphql";
const link = new HttpLink({
  uri,
  fetch,
  headers: { authorization: "Bearer d2adec13772c55d35bf92b8e3da0f27fd20c7b03" }
});

export const makeQuery = operation => makePromise(execute(link, operation));
