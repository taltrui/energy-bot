import config from './config';

export const run = async () => {
  const dirsToRun = {};

  await Promise.all(
    config.directives.map(async directive => {
      dirsToRun[directive] = await import(`../directives/${directive}`);
      return import(`../directives/${directive}`);
    })
  );

  for (const directive in dirsToRun) {
    dirsToRun[directive].execute();
  }
};
