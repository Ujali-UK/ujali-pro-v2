import firebase from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyDcGG_ix-gGufY6uHEsanWBJI4xmohSlQs',
  authDomain: 'ujali-staging.firebaseapp.com',
  databaseURL: 'https://ujali-dev.firebaseio.com',
  projectId: 'ujali-staging',
  storageBucket: 'gs://ujali-staging.appspot.com',
  messagingSenderId: '750310250678',
  appId: '1:750310250678:web:7dbc0b010eaa80c343ee17',
  measurementId: 'G-1JGK0X7KLS',
};

export const firebaseClient = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};
