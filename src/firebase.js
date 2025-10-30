import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEPJMu8DzRxdKMx0dg5vJ7WSLkoBJdjZk",
  authDomain: "react-login-task.firebaseapp.com",
  projectId: "react-login-task",
  storageBucket: "react-login-task.firebasestorage.app",
  messagingSenderId: "785652322951",
  appId: "1:785652322951:web:9fbbcb067268b181fc5e22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

// 🧠 What this does
// initializeApp() connects your app to Firebase.

// getAuth() sets up Firebase Authentication.

// GoogleAuthProvider() tells Firebase you want Google login.

// signInWithPopup() opens the Google sign-in popup.

// signOut() logs the user out.