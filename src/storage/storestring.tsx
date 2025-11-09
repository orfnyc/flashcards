//import { useState } from "react";
import { db,auth } from "../firebase";
//import { auth, firestore } from "../firebase";
import {increment,doc,setDoc,getDoc,updateDoc,arrayUnion} from "firebase/firestore";
//import {onSnapshot, setDoc, updateDoc, arrayUnion, serverTimestamp} from "firebase/firestore";
//import { getFirestore } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth"



//given deckID, arrayString
// cards field

export async function overRideArr(id: string, cardsArr: string[]){
    const cardArr = await doc(db,"decks",id);
    await updateDoc(cardArr, {
        cards: cardsArr
    })
}

export  async function GetCurrentDeckID(){
    const deckIndexVal = await getDoc(doc(db,"deckCounter","deckCount"));
    return deckIndexVal.data()?.count ?? 0;;
}

export async function GetCardArray(){
    const deckID = await GetCurrentDeckID();
    const deckRef = await getDoc(doc(db,"decks",String(deckID),));
    return [deckRef.data()?.cards ?? [], deckID.toString()];
}

export async function AppendCardArray(){
    const deckID = await GetCurrentDeckID();
    //const deckRef = await getDoc(doc(db,"decks",String(deckID),));
   // console.log(deckRef.data()?.cards ?? [])
    const deckRef = await doc(db,"decks",String(deckID));
    
    const newItem1 = "cardStringTest2";
    await setDoc(
        deckRef,
        {cards: arrayUnion(newItem1)},
        {merge: true}
    ) ;

}


export async function IncrementDeckCounter(){
    const deckCounterRef = doc(db, "deckCounter","deckCount");
    await updateDoc(deckCounterRef, {
    count: increment(1),
  });
}

export function GetUserDeck() {
    console.log("this is running");
    onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("No user signed in");
      return;
    }
    console.log("UID:", user.uid);

    const deckRef = doc(db, "users", user.uid, "decks", "0");
    const deckSnap = await getDoc(deckRef);
    console.log(deckSnap.data)
    if (!deckSnap.exists()) {
      console.log('Deck "0" not found for user');
      return;
    }
    const deckrefref = doc(db,"decks",String(deckSnap));
    console.log(deckrefref);
  });

}

export default async function AddToFlashcardArr() {
  console.log("This function is being called");
  GetUserDeck();
  //GetCardArray();
  //AppendCardArray();
  //IncrementDeckCounter();
}











    






