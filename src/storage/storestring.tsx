//import { useState } from "react";
import { db } from "../firebase";
//import { auth, firestore } from "../firebase";
import { addDoc,collection,doc,setDoc,getDoc,updateDoc,arrayUnion } from "firebase/firestore";
//import {onSnapshot, setDoc, updateDoc, arrayUnion, serverTimestamp} from "firebase/firestore";
//import { getFirestore } from "firebase/firestore";






export  async function GetCurrentDeckID(){
    const deckIndexVal = await getDoc(doc(db,"deckCounter","deckCount"));
    return deckIndexVal.data()?.count ?? 0;;
}

export async function GetCardArray(){
    const deckID = await GetCurrentDeckID();
    const deckRef = await getDoc(doc(db,"decks",String(deckID),));
    return deckRef.data()?.cards ?? [];
}

export async function AppendCardArray(){
    const deckID = await GetCurrentDeckID();
    //const deckRef = await getDoc(doc(db,"decks",String(deckID),));
   // console.log(deckRef.data()?.cards ?? [])
    const deckRef = await doc(db,"decks",String(deckID));
    
    const newItem1 = "cardStringTest";
    await setDoc(
        deckRef,
        {cards: arrayUnion(newItem1)},
        {merge: true}
    ) ;

}


export async function IncrementDeckCounter(){
    const deckCounterRef = doc(db, "deckCounter","deckCount");
    const deckCounter = await getDoc(deckCounterRef);
    //number newDeckCounter = deckCounter.data().c
    //console.log(deckCounter.data().count);

}
export default async function AddToFlashcardArr() {

  console.log("This function is being called");
  GetCardArray();
  //AppendCardArray();
  IncrementDeckCounter();
}











    






