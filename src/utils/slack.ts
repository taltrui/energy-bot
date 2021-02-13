import { Employee } from 'general';

export const getSlackId = (employees: Array<Employee>, name: string): string => {
  const employee = employees.find((_employee) => _employee.name === name);
  const slackId = employee?.slack_id;

  return slackId ? `<@${slackId}>` : name ?? '';
};
