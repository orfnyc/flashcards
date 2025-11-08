import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

export default function storeString() {
  const [text, setText] = useState("");

  async function handleAppend() {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("You must be signed in first.");
      return;
    }
    const userRef = doc(db, "users", uid);

    // Ensure the doc exists, but don't clobber existing fields
    await setDoc(
      userRef,
      { createdAt: serverTimestamp() },
      { merge: true }
    );

    await updateDoc(userRef, {
      texts: arrayUnion(text),
      updatedAt: serverTimestamp(),
    });

    setText("");
  }

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something…"
      />
      <button onClick={handleAppend} disabled={!text}>
        Add to My Texts
      </button>
    </div>
  );
}