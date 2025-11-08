// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { connectAuthEmulator,getAuth,GoogleAuthProvider,OnAuthStateChanged,signInWithRedictect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const auth = getAuth();
const button = document.querySelector('button')
button?.addEventListener('click',clickEvent => {
  signInWithRedictect(auth, new GoogleAuthProvider())
})

OnAuthStateChanged(auth, user => {
  if(user == null){return;}
  console.log(user);
})

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARaU-jx9Xe482s-zaj7THxOqFbhXuoxzI",
  authDomain: "flashcards-4101e.firebaseapp.com",
  projectId: "flashcards-4101e",
  storageBucket: "flashcards-4101e.firebasestorage.app",
  messagingSenderId: "356789370947",
  appId: "1:356789370947:web:f6e86696b63784565654f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
connectAuthEmulator(auth,"htts://localhost:500");

