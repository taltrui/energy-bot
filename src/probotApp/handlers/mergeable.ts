import { Context } from "probot";
import { logObject } from "../../utils/devUtils";
import { isRelease } from "../utils";

const mergeable = async (context: Context<any>): Promise<void> => {
  const timeStart = new Date().toISOString();
  const pr = context.payload.pull_request;
  logObject(context.payload);
  let summary: string | undefined;
  let conclusion: 'success' | 'failure' | undefined;
  let title: string | undefined;

  if (pr.base.ref === 'master') {
    if (isRelease(pr.head.ref)) {
      title = 'You can safely merge this branch.'
      summary = 'Release branches can be merged to master.'
      conclusion = 'success'
    } else {
      title = "You shouldn't merge this branch."
      summary = "Only release branches can be merged to master."
      conclusion = 'failure'
    }
  } else {
    title = 'You can safely merge this branch'
    summary = 'If base branch is not master, you can merge any branch.';
    conclusion = 'success';
  }


  context.github.request(pr.base.labels_url)
  if (summary && conclusion) {
    await context.github.checks
      .create(
        context.repo({
          name: 'Mergeable',
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

export default mergeable;