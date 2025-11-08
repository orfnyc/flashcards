// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


import { getStorage  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries






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

 // Export Firebase services for use in your components
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export const storage = getStorage(app);
    export const firestore = getFirestore(app);
