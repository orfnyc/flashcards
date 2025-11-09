

import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {setDoc,getDoc,doc} from "firebase/firestore"
//import {collection, addDoc} from "firebase/firestore";


export default function SignInButton() {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);       
      const snap = await getDoc(userRef);               
      if (!snap.exists()) {                              
        await setDoc(userRef, { user_id: user.uid });
        console.log("NEW USER", user.uid);
      } else {
        console.log("DONT CREATE A NEW USER", user.uid);
      }
    }
  });

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}


