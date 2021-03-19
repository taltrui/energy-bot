import { Probot } from 'probot';
import mergeable from './handlers/mergeable';
import updateJiraStatus from './handlers/updateJiraStatus';

export = (app: Probot): void => {
  app.on(
    [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request.labeled',
      'pull_request.unlabeled',
      'pull_request.reopened',
    ],
    mergeable
  );

  app.on(['pull_request.opened', 'pull_request.labeled'], updateJiraStatus);
};
