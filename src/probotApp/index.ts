import { Probot } from 'probot';
import mergeable from './handlers/mergeable';
import released from './handlers/released';

export = (app: Probot): void => {
  app.on(
    [
      'pull_request.hhh',
      'pull_request.hhh',
      'pull_request.hh',
      'pull_request.hh',
      'pull_request.hhh',
    ],
    mergeable
  );

  app.on(['pull_request.labeled'], released);
};
