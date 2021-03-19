import { Context } from 'probot';

import { transitionIssue } from '../../handlers/jira';
import { getIssueId, isReadyForRelease } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transitionIssueToReady = async (context: Context<any>): Promise<void> => {
  const pr = context.payload.pull_request;

  const issueId = getIssueId(pr.head.ref);

  if (isReadyForRelease(pr.labels) && issueId) {
    transitionIssue('231', issueId);
  }
};

export default transitionIssueToReady;
