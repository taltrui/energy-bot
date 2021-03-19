import admin from 'firebase-admin';
import { Config } from 'firebase';

const serviceAccount: Config = {
  type: 'service_account',
  project_id: process.env.FIRESTORE_PROYECT_ID || 'aaa',
  private_key_id: process.env.FIRESTORE_PRIV_KEY_ID || 'aaa',
  private_key: process.env.FIRESTORE_PRIV_KEY?.replace(/\\n/g, '\n') || 'aa',
  client_email: process.env.FIRESTORE_CLIENT_EMAIL || 'aaa',
  client_id: process.env.FIRESTORE_CLIENT_ID || 'aa',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIRESTORE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
