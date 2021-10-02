import firebase from "firebase/app";
import'firebase/firestore' 
const firebaseConfig = {
    apiKey: "AIzaSyDgUxOAYDx5-EYqBZkWsQxJ2VLGrz2HPhg",
    authDomain: "crud-react-9b6a4.firebaseapp.com",
    projectId: "crud-react-9b6a4",
    storageBucket: "crud-react-9b6a4.appspot.com",
    messagingSenderId: "955999792283",
    appId: "1:955999792283:web:2c2aff9599197967322a3e"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export{firebase}