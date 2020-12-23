import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8J5cN_YROXbg3c0rkOfVCSZwkcfcgrv0",
    authDomain: "handicraft-nepal-9336f.firebaseapp.com",
    projectId: "handicraft-nepal-9336f",
    storageBucket: "handicraft-nepal-9336f.appspot.com",
    messagingSenderId: "1027977511094",
    appId: "1:1027977511094:web:772421f8368ab11fd62617"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export 

// For using Google Authication
export const auth = firebase.auth();

// For using Gmail as regrestration 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();