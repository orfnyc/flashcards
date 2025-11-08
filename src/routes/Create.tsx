import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useRef } from 'react';
import CreateMode from '../midlayer/CreateMode';
import AddToFlashcardArr from '../storage/storestring';
import {readASingleDocument} from '../storage/storestring';
import {listenToADocument} from '../storage/storestring';

export const Route = createFileRoute('/Create')({
    component: Create,
})


function Create()
{
    const createRef = useRef(new CreateMode());
    const createInstance = createRef.current;
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");



    const handleSubmit = (e) => 
    {
        e.preventDefault();
        createInstance.addCard(question, answer);
        localStorage.setItem('deck', JSON.stringify(createInstance.getDeck()));
        AddToFlashcardArr();
        readASingleDocument();
        listenToADocument();
    }

    return (
        <div>
            <div>Create</div>
            <form className="answerSubmission" onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setQuestion(e.target.value)}/><br/>
                <input type="text" onChange={(e) => setAnswer(e.target.value)}/><br/>
                <button type='submit'>Add Card</button>
            </form>
        </div>
    );
}