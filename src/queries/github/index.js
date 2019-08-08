import gql from 'graphql-tag';
import QueryHandler from '../../handlers/graphql/QueryHandler';

const uri = 'https://api.github.com/graphql';
const headers = {
  authorization: 'Bearer 8ce0519cb4e19305b56c4748768d91333ed798d6'
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
