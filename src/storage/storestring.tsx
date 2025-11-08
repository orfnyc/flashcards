import { useState } from "react";
import { db, auth,firestore } from "../firebase";
import { onSnapshot,doc,getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const flashcards = doc(firestore, 'flashcard/SEBKcU79uLCVOnJZKzzZ');

export default async function AddToFlashcardArr(){
    console.log("This function is being called")

    const docData = {
        ans: "TEST_ANSWER4",
        fc_string: "TEST_THING4"
    };
    setDoc(flashcards,docData).then(() => {
        console.log('VALUE HAS BEEN WRITTEN');
    }
)};

export async function getOwnedDecksField()
{
  const test = await getDoc(doc(db, "users", "sample_user_id"));
  console.log("DATA: " + test.data().decks);
}

export async function readASingleDocument(){
    const mySnapShot = await getDoc(flashcards);
    if(mySnapShot.exists()){
        const docData = mySnapShot.data();
        console.log('Trying to read Document');
        console.log(`Snapshot Data is ${JSON.stringify(docData)}`)
    }   
};

export function listenToADocument() {
  onSnapshot(flashcards, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data();
      console.log('Trying to listen to document');
      console.log(`In realtime. docdata is ${JSON.stringify(docData)}`);
    }
  });
}

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






