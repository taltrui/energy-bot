import { Probot } from 'probot';
import mergeable from './handlers/mergeable';
import released from './handlers/released';

export = (app: Probot): void => {
  app.on(
    [
      'pull_request.opened',
      'pull_request.asd',
      'pull_request.asd',
      'pull_request.asd',
      'pull_request.asd',
    ],
    mergeable
  );

  app.on(['pull_request.labeled'], released);
};
