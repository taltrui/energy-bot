import { Probot } from 'probot';
import mergeable from './handlers/mergeable';
import transitionIssueToReview from './handlers/transitionIssueToReview';
import transitionIssueToReady from './handlers/transitionIssueToReady';
import commentReleasedIssue from './handlers/commentReleasedIssue';

export = (app: Probot): void => {
  app.on(
    [
      'pull_request.opened',
      'pull_request.reopened',
      'pull_request.edited',
      'pull_request.labeled',
      'pull_request.unlabeled',
      'pull_request.synchronize',
    ],
    mergeable
  );

  app.on(['pull_request.opened'], transitionIssueToReview);
  app.on(['pull_request.labeled'], transitionIssueToReady);
  app.on(['issue_comment.created'], commentReleasedIssue);
};
