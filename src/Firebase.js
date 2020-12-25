

import firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDcbw2GQnqz0igkw7FN0rFpsuM2XLb7ABQ",
  authDomain: "mediadash-de325.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "mediadash-de325",
  storageBucket: "mediadash-de325.appspot.com",
  messagingSenderId: "462800498813",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;