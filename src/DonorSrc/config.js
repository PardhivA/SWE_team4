// import firebase from 'firebase/app';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import "firebase/compat/storage";
import "firebase/compat/";
const firebaseConfig = {
  apiKey: "AIzaSyDysBPBdh97xdEPar5zKKhKq8fh8viO6gc",
  authDomain: "finaltry-680f1.firebaseapp.com",
  projectId: "finaltry-680f1",
  storageBucket: "finaltry-680f1.appspot.com",
  messagingSenderId: "87318139201",
  appId: "1:87318139201:web:e81c08529f0e71590d91c0",
  measurementId: "G-ERZC17V8Q2",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();
// const query = firebase.storage().query();
export { firebase, storageRef };
