import { Context } from 'probot';

import { createParagraph } from '../../utils/jira';
import { addMessage } from '../../handlers/jira';
import { getIssueId, getReleaseVersionFromComment, isReleased } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commentReleasedIssue = async (context: Context<any>): Promise<void> => {
  const pr = context.payload.issue;
  const repo = context.payload.repository;
  const comment = context.payload.comment.body;

  const released = isReleased(pr.labels);

  if (!released) {
    return;
  }

  const releaseVersion = getReleaseVersionFromComment(comment);

  if (!releaseVersion) {
    return;
  }

  const prId = pr.number;

  const prInfo = await context.octokit.pulls.get({
    owner: repo.owner.login,
    repo: repo.name,
    pull_number: prId,
  });

  const issueId = getIssueId(prInfo.data.head.ref);

  if (issueId) {
    addMessage(createParagraph(`Esta card fue incluida en la versión ${releaseVersion}`), issueId);
  }
};

export default commentReleasedIssue;
