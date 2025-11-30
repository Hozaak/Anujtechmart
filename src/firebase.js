import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration (provided by user)
const firebaseConfig = {
  apiKey: "AIzaSyByG-z3SoQtpQVbTUqDilACQmAu4IozgT0",
  authDomain: "anuj-tech-mart.firebaseapp.com",
  projectId: "anuj-tech-mart",
  storageBucket: "anuj-tech-mart.firebasestorage.app",
  messagingSenderId: "1002969372812",
  appId: "1:1002969372812:web:a1d05661c3151e5f8f43a9",
  measurementId: "G-RHQLSBYNZL"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services we need
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
