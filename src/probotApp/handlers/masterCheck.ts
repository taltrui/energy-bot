import { Context } from "probot";
import { logObject } from "../../utils/devUtils";
import { isRelease } from "../utils";

const check = async (context: Context<any>): Promise<void> => {
  const timeStart = new Date().toISOString();
  const pr = context.payload.pull_request;
  logObject(context.payload);
  let summary: string | undefined;
  let conclusion: 'success' | 'failure' | undefined;
  let title: string | undefined;

  if (pr.base.ref === 'master') {
    if (isRelease(pr.head.ref)) {
      title = 'Yes!'
      summary = 'Yes! You can merge this release to master.'
      conclusion = 'success'
    } else {
      title = 'No!'
      summary = "You can't merge this branch to master!"
      conclusion = 'failure'
    }
  } else {
    title = 'Yes!'
    summary = 'You can merge this branch.';
    conclusion = 'success';
  }


  context.github.request(pr.base.labels_url)
  if (summary && conclusion) {
    await context.github.checks
      .create(
        context.repo({
          name: 'Can you merge?',
          head_sha: pr.head.sha,
          status: 'completed',
          started_at: timeStart,
          conclusion,
          completed_at: new Date().toISOString(),
          output: {
            title,
            summary
          }
        })
      )
  }
}

export default check;