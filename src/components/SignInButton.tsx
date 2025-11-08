

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function SignInButton() {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  onAuthStateChanged(auth, (user) => {
    console.log(user);
  })

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}


