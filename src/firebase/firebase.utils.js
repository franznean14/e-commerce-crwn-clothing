import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCMrK1CjXoli8DWReZkKe-eh_ySG0pTmAM",
    authDomain: "crwn-db-56fdd.firebaseapp.com",
    databaseURL: "https://crwn-db-56fdd.firebaseio.com",
    projectId: "crwn-db-56fdd",
    storageBucket: "crwn-db-56fdd.appspot.com",
    messagingSenderId: "983686434886",
    appId: "1:983686434886:web:20d6f1ade9848d9d3bfa47",
    measurementId: "G-RZ5FET386V"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const { displayName, email, createdAt = new Date()} = userAuth

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

