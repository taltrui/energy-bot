import QueryHandler from '../graphql/QueryHandler'

const uri = process.env.GITHUB_API_URI;
const headers = {
  authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`
};

export const QueryMaker = new QueryHandler(uri, headers);
