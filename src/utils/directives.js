import { CronJob } from 'cron';
import { getCollection } from '../queries/firestore/utils';
import { getDirectives } from '../models/config';

const createJob = (directive, config) => {
  const job = new CronJob(config.cron, () => directive.execute(config));

  job.start();
};

const initDirective = async directive => {
  const { id, config } = directive;

  const dirToRun = await import(`../directives/${id}`);

  config.forEach(_config => createJob(dirToRun, _config));
};

export const runStandaloneDirective = async (directive, config) => {
  const dirToRun = await import(`../directives/${directive}`);

  dirToRun.execute(config);
};

export const initDirectivesJobs = async () => {
  const directives = await getDirectives();

  console.log(directives);
  directives.forEach(directive => initDirective(directive));
};
