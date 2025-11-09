//import { useState } from "react";
import { db } from "../firebase";
//import { auth, firestore } from "../firebase";
import { addDoc,collection,doc,getDoc } from "firebase/firestore";
//import {onSnapshot, setDoc, updateDoc, arrayUnion, serverTimestamp} from "firebase/firestore";
//import { getFirestore } from "firebase/firestore";

/*
export default async function AddToFlashcardArr(){
    console.log("This function is being called")
    const docData = {
        ans: "TEST_ANSWER5",
        fc_string: "TEST_THING5"
    };
    setDoc(flashcards,docData,{merge: true}).then(() => {
        console.log('VALUE HAS BEEN WRITTEN');
    }
)};
*/


export  async function GetCurrentDeckID(){
    const deckIndexVal = await getDoc(doc(db,"deckCounter","deckCount"));
    return deckIndexVal.data()?.count ?? 0;;
}

export async function GetCardArray(){
    const deckID = await GetCurrentDeckID();
    const deckRef = await getDoc(doc(db,"decks",String(deckID),));
    return deckRef.data()?.cards ?? [];

}
//const flashcards = doc(db, 'flashcard/SEBKcU79uLCVOnJZKzzZ');
export async function addCardCurrentDeck(){

}
export default async function AddToFlashcardArr() {

  console.log("This function is being called");
  GetCardArray();


  const docData = {
    ans: "TEST_ANSWER6",
    fc_string: "TEST_THING6",
  };

  try {
    const docRef = await addDoc(collection(db, "flashcard"), docData);
    console.log(" Added new flashcard with ID:", docRef.id);
  } catch (e) {
    console.error(" Error adding flashcard:", e);
  }
}



// export async function getOwnedDecksField()
// {
//   const test = await getDoc(doc(db, "users", "sample_user_id"));
//   console.log("DATA: " + test.data().decks);
// }

// export async function readASingleDocument(){
//     const mySnapShot = await getDoc(flashcards);
//     if(mySnapShot.exists()){
//         const docData = mySnapShot.data();
//         console.log('Trying to read Document');
//         console.log(`Snapshot Data is ${JSON.stringify(docData)}`)
//     }   
// };

// export function listenToADocument() {
//   onSnapshot(flashcards, (docSnapshot) => {
//     if (docSnapshot.exists()) {
//       const docData = docSnapshot.data();
//       console.log('Trying to listen to document');
//       console.log(`In realtime. docdata is ${JSON.stringify(docData)}`);
//     }
//   });
// }

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






