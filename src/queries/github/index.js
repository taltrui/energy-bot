import gql from "graphql-tag";
import { makeQuery } from "../utils/queryHandler";

export const getPrs = (owner, name, amount, state) =>
  makeQuery({
    query: gql`
      query GET_PRS(
        $owner: String!
        $name: String!
        $amount: Int
        $state: [PullRequestState!]
      ) {
        repository(owner: $owner, name: $name) {
          pullRequests(last: $amount, states: $state) {
            edges {
              node {
                title
                url
                labels(first: 5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      owner,
      name,
      amount,
      state
    }
  });
