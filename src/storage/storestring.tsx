import { useState } from "react";
import { db, auth,firestore } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default async function AddToFlashcardArr(){
    console.log("This function is being called")
  
    const flashcards = doc(firestore, 'flashcard/SEBKcU79uLCVOnJZKzzZ');
    const docData = {
        ans: "TEST_ANSWER",
        fc_string: "TEST_THING"
    };
    setDoc(flashcards,docData).then(() => {
        console.log('VALUE HAS BEEN WRITTEN');
    }
);
      /*
    //const flashcard = doc(firestore, 'fcArray/tl6kFGnUf1jd9xEbE6Z7');
    const docRef = doc(db,"fcArray","tl6kFGnUf1jd9xEbE6Z7");

   await setDoc(
    docRef,
    {
      fcQuesArr: arrayUnion("Test Questions Firebase"),
      fcAnsArr: arrayUnion("FirebaseAns"),
    },
    { merge: true } 
  );
  */

}



