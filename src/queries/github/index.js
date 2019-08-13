import gql from 'graphql-tag';
import QueryHandler from '../../handlers/graphql/QueryHandler';

const uri = process.env.GITHUB_API_URI;
const headers = {
  authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`
};

const QueryMaker = new QueryHandler(uri, headers);

export const getPrs = from =>
  QueryMaker.execute({
    query: gql`
      query GET_PRS($from: String!) {
        user(login: $from) {
          repositories(first: 100) {
            edges {
              node {
                name
                pullRequests(first: 100, states: OPEN) {
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
                      assignees(first: 20) {
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
