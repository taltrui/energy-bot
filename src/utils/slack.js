import config from './config';

export const getSlackId = name =>
  typeof config.teamMembers[name] === 'string' ? `<@${config.teamMembers[name]}>` : name;
