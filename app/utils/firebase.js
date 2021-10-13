import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBuE_wICzNzmGlRe8osfTgQl0KFdbAXAsc",
  authDomain: "tenedores-5b03a.firebaseapp.com",
  projectId: "tenedores-5b03a",
  storageBucket: "tenedores-5b03a.appspot.com",
  messagingSenderId: "727298811305",
  appId: "1:727298811305:web:0ebb7ab9afaacbc96590b8"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);