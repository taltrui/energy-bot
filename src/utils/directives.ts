import { CronJob } from 'cron';
import { getDirectives } from '../models/config';
import { Config } from 'pr_reminder';
import { Directive } from 'general';

const createJob = (directive: Directive, config: Config) => {
  const job = new CronJob(config.cron, () => directive.execute(config));

  job.start();
};

const initDirective = async (directive: Directive) => {
  const { id, config } = directive;

  const dirToRun = await import(`../directives/${id}`);

  config.forEach((_config: Config) => createJob(dirToRun, _config));
};

export const runStandaloneDirective = async (directive: string, config: Config) => {
  const dirToRun = await import(`../directives/${directive}`);

  dirToRun.execute(config);
};

export const initDirectivesJobs = async () => {
  const directives = await getDirectives();
  directives.forEach((directive: Directive) => initDirective(directive));
};
