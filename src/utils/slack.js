export const getSlackId = (employees, name) => {
  const employee = employees.find(_employee => _employee.name === name) || {};
  const { slack_id } = employee;

  return slack_id ? `<@${slack_id}>` : name;
};
