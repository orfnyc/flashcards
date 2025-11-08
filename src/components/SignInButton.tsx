import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {GoogleAuthProvider,onAuthStateChanged,signInWithRedirect,getRedirectResult,User,} from "firebase/auth";

export default function SignInButton() {
  const handleSignIn = () =>
    signInWithRedirect(auth, new GoogleAuthProvider());

  return <button onClick={handleSignIn}>Sign in</button>;
}

