import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
// } from "@env";
const firebaseConfig = {
  apiKey: "AIzaSyBp13RhcLOo6sM0eCrMYmjt2odQ02Ari3Y",
  authDomain: "attendence-app-c2fd2.firebaseapp.com",
  projectId: "attendence-app-c2fd2",
  storageBucket: "attendence-app-c2fd2.firebasestorage.app",
  messagingSenderId: "668595807204",
  appId: "1:668595807204:web:40b8b6454ca28b48f59df1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
