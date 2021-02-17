import * as admin from 'firebase-admin';
const secrets = require('../secret.json');

export const verifyIdToken = token => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(secrets),
      databaseURL: 'https://ujali-dev.firebaseio.com',
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error;
    });
};
