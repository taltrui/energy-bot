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
      'pull_request.assigned',
      'pull_request.synchronize',
      'pull_request.reopened',
      'pull_request.unassigned',
    ],
    mergeable
  );

  app.on(['pull_request.labeled', 'pull_request.opened'], updateJiraStatus);
};
