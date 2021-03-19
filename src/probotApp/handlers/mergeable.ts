import { Context } from 'probot';
import { isRelease, isWIPorHold } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeable = async (context: Context<any>): Promise<void> => {
  const timeStart = new Date().toISOString();
  const pr = context.payload.pull_request;

  let isMergeable = true;

  let isBaseMaster = false;
  let isHeadRelease = false;

  if (pr.base.ref === 'master') {
    isBaseMaster = true;
  }

  if (isRelease(pr.head.ref)) {
    isHeadRelease = true;
  }

  if (isWIPorHold(pr.labels) || (isBaseMaster && !isHeadRelease)) {
    isMergeable = false;
  }

  await context.octokit.checks.create(
    context.repo({
      name: 'Mergeable',
      head_sha: pr.head.sha,
      status: 'completed',
      started_at: timeStart,
      conclusion: isMergeable ? 'success' : 'failure',
      completed_at: new Date().toISOString(),
      output: {
        title: isMergeable ? 'Pull request can be merged.' : 'Pull request cannot be merged.',
        summary: isMergeable
          ? 'This PR passed the checks for it to be merged.'
          : 'This PR is either in WIP or Hold status or a non release branch has master as its base.',
      },
    })
  );
};

export default mergeable;
