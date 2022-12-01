// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import { firebaseConfig } from './globals'


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
