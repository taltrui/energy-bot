import CronJob from 'cron';

const createJob = (directive, config) => {
  const job = new CronJob(config.cron, () => directive.execute(config));

  job.start();
};

const initDirective = async directive => {
  const { id, config } = directive;

  const dirToRun = await import(`../directives/${id}`);

  config.forEach(_config => createJob(dirToRun, _config));
};

export const init = async () => {};
