import { db } from '../../config/firebase';
import { Query } from '@google-cloud/firestore';

export const getCollection = async (collectionName: string): Promise<{data?: any, error?: any}> =>
  db
    .collection(collectionName)
    .get()
    .then(collection => {
      const items: Array<any> = [];
      if (!collection || collection.empty) return { error: 'COLLECTION_NOT_FOUND' };
      collection.forEach(item => items.push({ id: item.id, ...(item.data() || {}) }));
      return { data: items };
    })
    .catch(error => ({ error }));

export const getCollectionWithQuery = async (collectionName: string, query: Parameters<Query['where']>): Promise<{data?: any, error?: any}> =>
  db
    .collection(collectionName)
    .where(...query)
    .get()
    .then(snapshot => {
      const items: Array<any> = [];

      if (!snapshot || snapshot.empty) return { error: 'COLLECTION_NOT_FOUND' };
      snapshot.forEach(item => items.push(item.data()));
      return { data: items };
    })
    .catch(error => ({ error }));
