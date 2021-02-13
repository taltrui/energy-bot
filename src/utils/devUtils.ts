import util from 'util';

export const logObject = (object: unknown): void =>
  console.log(util.inspect(object, { showHidden: false, depth: null }));
