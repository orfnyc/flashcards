import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {GoogleAuthProvider,onAuthStateChanged,signInWithRedirect,getRedirectResult,User,} from "firebase/auth";

export default function SignInButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getRedirectResult(auth).catch((err) =>
      console.warn("Redirect result error:", err)
    );
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const handleSignIn = () => signInWithRedirect(auth, new GoogleAuthProvider());

  return user ? (
    <div>
      <p>Signed in as {user.displayName ?? user.email}</p>
    </div>
  ) : (
    <button onClick={handleSignIn}>Sign in</button>
  );
}
