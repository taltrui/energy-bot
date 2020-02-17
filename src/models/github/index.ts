import gql from 'graphql-tag';
import { QueryMaker } from '../../handlers/github';
import { RepositoriesData } from 'github';

export const getPrs = (from: string): Promise<any> =>
  QueryMaker.execute({
    query: gql`
      query GET_PRS($from: String!) {
        user(login: $from) {
          repositories(first: 50) {
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
                      labels(first: 1) {
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
      from
    }
  });
