import gql from "graphql-tag";
import { makeQuery } from "../utils/queryHandler";

export const getPrs = from =>
  makeQuery({
    query: gql`
      query GET_PRS($from: String!) {
        user(login: $from) {
          repositories(last: 100) {
            edges {
              node {
                name
                pullRequests(last: 100, states: OPEN) {
                  edges {
                    node {
                      createdAt
                      headRefName
                      author {
                        login
                      }
                      title
                      assignees(last: 30) {
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
          }
        }
      }
    `,
    variables: {
      from
    }
  });
