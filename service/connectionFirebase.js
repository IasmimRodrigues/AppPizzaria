import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5gEm-zDzNhqebCbGE1PsjoZtoNN5buCA",
  authDomain: "projeto1-cbe0a.firebaseapp.com",
  databaseURL: "https://projeto1-cbe0a-default-rtdb.firebaseio.com",
  projectId: "projeto1-cbe0a",
  storageBucket: "projeto1-cbe0a.appspot.com",
  messagingSenderId: "330459044217",
  appId: "1:330459044217:web:c8661320ad8ae8dda037a8",
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
