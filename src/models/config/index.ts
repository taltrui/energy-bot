import { Directive, Employee } from 'general';
import { getCollection, getCollectionWithQuery } from '../../queries/firestore/utils';

export const getDirectives = async (): Promise<Array<Directive>> => {
  const { error, data } = await getCollection('directives');

  if (error) {
    console.log(error);
    return [];
  } else return data;
};

export const getDirective = async (id: string): Promise<Array<Directive>> => {
  const { error, data } = await getCollectionWithQuery('directives', ['id', '==', id]);

  if (error) {
    console.log(error);
    return [
      {
        config: [],
        id: '',
        execute: () => undefined,
      },
    ];
  } else return data;
};

export const getEmployees = async (): Promise<Array<Employee>> => {
  const { error, data } = await getCollection('employees');

  if (error) {
    console.log(error);
    return [];
  } else return data;
};

export const getEmployee = async (name: string): Promise<Employee | void> => {
  const { error, data } = await getCollectionWithQuery('employees', ['name', '==', name]);

  if (error) {
    console.log(error);
    return {
      github_id: '',
      team: [],
      slack_id: '',
      name: '',
    };
  } else return data;
};
