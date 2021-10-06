import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCpmwr8EYLihlgbytyA2x43VC6T2kPiq8g",
  authDomain: "todo-app-react-5e526.firebaseapp.com",
  projectId: "todo-app-react-5e526",
  storageBucket: "todo-app-react-5e526.appspot.com",
  messagingSenderId: "336804819208",
  appId: "1:336804819208:web:a10058e652f4cc398d3cbd",
  measurementId: "G-FNQ038GDG8"
});

const db = firebaseApp.firestore();

export default db;
