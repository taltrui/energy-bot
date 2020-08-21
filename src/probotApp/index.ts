import { Application } from 'probot'

import masterCheck from './handlers/masterCheck';

export = (app: Application) => {
  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    await context.github.issues.createComment(issueComment)
  })

  app.on([
    'pull_request.opened',
    'pull_request.edited'
  ], masterCheck)
}
