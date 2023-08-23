// import firebase from 'firebase/app';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDysBPBdh97xdEPar5zKKhKq8fh8viO6gc",
  authDomain: "finaltry-680f1.firebaseapp.com",
  projectId: "finaltry-680f1",
  storageBucket: "finaltry-680f1.appspot.com",
  messagingSenderId: "87318139201",
  appId: "1:87318139201:web:b4cd9ec286970f790d91c0",
  measurementId: "G-ZT33JM7SYP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, "secondary");
}

export { firebase };
