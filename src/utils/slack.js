import { getEmployee } from '../models/config';

export const getSlackId = name => {
  const { slack_id } = getEmployee(name) || {};

  return slack_id ? `<@${slack_id}>` : name;
};
