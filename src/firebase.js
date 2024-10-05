// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSV5RXu0-h8hc26CK3ZzxsEgqBIadyPzY",
  authDomain: "naasa-project.firebaseapp.com",
  projectId: "naasa-project",
  storageBucket: "naasa-project.appspot.com",
  messagingSenderId: "505267906967",
  appId: "1:505267906967:web:a8e4f4146a245e6043fcd2",
  measurementId: "G-C2Y319BRDD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
