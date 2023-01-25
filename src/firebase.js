import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const KEY = process.env.REACT_APP_LINE_KEY

const firebaseApp = firebase.initializeApp({
  apiKey: KEY,
  authDomain: "line-clone-43d2b.firebaseapp.com",
  projectId: "line-clone-43d2b",
  storageBucket: "line-clone-43d2b.appspot.com",
  messagingSenderId: "322342698432",
  appId: "1:322342698432:web:947e6e35aecfef92371c25"
})

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
