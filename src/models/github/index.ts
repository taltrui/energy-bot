import gql from 'graphql-tag';
import { QueryMaker } from '../../handlers/github';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPrs = (from: string): Promise<any> =>
  QueryMaker.execute({
    query: gql`
      query GET_PRS($from: String!) {
        user(login: $from) {
          repositories(first: 90, isFork: false) {
            edges {
              node {
                name
                pullRequests(first: 30, states: OPEN) {
                  edges {
                    node {
                      createdAt
                      headRefName
                      permalink
                      number
                      updatedAt
                      repository {
                        name
                      }
                      labels(first: 3) {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      author {
                        login
                      }
                      title
                      reviews(first: 5) {
                        edges {
                          node {
                            author {
                              login
                            }
                            state
                          }
                        }
                      }
                      assignees(first: 10) {
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
      from,
    },
  });
