import { Context } from 'probot';

import { getIssueId, isWIPorHold } from '../utils';
import { transitionIssue } from '../../handlers/jira';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transitionIssueToReview = async (context: Context<any>): Promise<void> => {
  const pr = context.payload.pull_request;

  const issueId = getIssueId(pr.head.ref);

  if (!isWIPorHold(pr.labels) && issueId) {
    transitionIssue('211', issueId);
  }
};

export default transitionIssueToReview;
