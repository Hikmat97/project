import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtbdokxAX3ouIex7csKdajCohJpog6qNk",
    authDomain: "first-5d86b.firebaseapp.com",
    projectId: "first-5d86b",
    storageBucket: "first-5d86b.appspot.com",
    messagingSenderId: "24230511818",
    appId: "1:24230511818:web:b10e7a816f0840f5e26033",
    measurementId: "G-FP4ZPGR4VB"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
export {auth};

