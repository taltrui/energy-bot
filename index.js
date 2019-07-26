import { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

const uri = 'https://api.github.com/graphql';
const link = new HttpLink({
  uri,
  fetch,
  headers: { authorization: 'Bearer d38c8d9ba58eb73360a45621659a5a8fc06b7bc0' }
});

const operation = {
  query: gql`
    query {
      repository(owner: "widergy", name: "UtilityGO-Energy-Simulator-Metrogas") {
        pullRequests(last: 20, states: CLOSED) {
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
  `
};

// For single execution operations, a Promise can be used
makePromise(execute(link, operation))
  .then(data => console.log(`received data ${JSON.stringify(data, null, 2)}`))
  .catch(error => console.log(`received error ${error}`));
