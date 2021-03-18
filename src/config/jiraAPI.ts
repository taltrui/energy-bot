import { create } from 'apisauce';

const api = create({
  baseURL: 'https://widergy.atlassian.net/rest/api/3',
  headers: {
    Authorization: `Basic ${process.env.JIRA_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
