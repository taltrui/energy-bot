import { Context } from 'probot';
import { getReleaseVersionFromComment } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateJiraStatus = async (context: Context<any>): Promise<void> => {
  const pr = context.payload.pull_request;
};

export default updateJiraStatus;
