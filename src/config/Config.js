import firebase from "firebase";

export var config = {
    apiKey: "AIzaSyATYsRS_M6geNfZV5yseO9DdHc3TTIOI6k",
    authDomain: "chat-program-d8e67.firebaseapp.com",
    databaseURL: "https://chat-program-d8e67.firebaseio.com",
    storageBucket: "chat-program-d8e67.appspot. com",
  };
  firebase.initializeApp(config);
  
  export const authProvider = new firebase.auth.GoogleAuthProvider();
  authProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  export const firebaseAuth = firebase.auth();