import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBaJ-Y_UW7K8i5tp7VtK9FD8dEFk9cDlYs',
  authDomain: 'chat-web-app-773ff.firebaseapp.com',
  projectId: 'chat-web-app-773ff',
  storageBucket: 'chat-web-app-773ff.appspot.com',
  messagingSenderId: '999120820712',
  appId: '1:999120820712:web:ba6075c7c3d1dce5afac5d',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
