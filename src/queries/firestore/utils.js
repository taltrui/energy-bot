import { db } from '../../config/firebase';

export const getCollection = async collectionName =>
  db
    .collection(collectionName)
    .get()
    .then(collection => {
      const items = [];
      if (!collection || collection.empty) return { error: 'COLLECTION_NOT_FOUND' };
      collection.forEach(item => items.push({ id: item.id, ...(item.data() || {}) }));
      return { ok: true, data: items };
    })
    .catch(error => ({ error }));

export const getCollectionWithQuery = async (collectionName, query) =>
  db
    .collection(collectionName)
    .where(query)
    .get()
    .then(collection => {
      const items = [];
      if (!collection || collection.empty) return { error: 'COLLECTION_NOT_FOUND' };
      collection.forEach(item => items.push({ id: item.id, ...(item.data() || {}) }));
      return { ok: true, data: items };
    })
    .catch(error => ({ error }));
