import { getCollection, getCollectionWithQuery } from '../../queries/firestore/utils';

export const getDirectives = async () => {
  const { error, data } = await getCollection('directives');

  if (error) {
    return console.log(error);
  } else return data;
};

export const getEmployees = async () => {
  const { error, data } = await getCollection('employees');

  if (error) {
    return console.log(error);
  } else return data;
};

export const getEmployee = async name => {
  const { error, data } = await getCollectionWithQuery('employees', ['name', '==', name]);

  if (error) {
    return console.log(error);
  } else return data;
};