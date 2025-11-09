import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useRef } from 'react';
import CreateMode from '../midlayer/CreateMode';
import AddToFlashcardArr from '../storage/storestring';
//import {readASingleDocument} from '../storage/storestring';
//import {listenToADocument} from '../storage/storestring';

export const Route = createFileRoute('/Create')({
    component: Create,
})


function Create()
{
    const createRef = useRef(new CreateMode());
    const createInstance = createRef.current;
    const [dummyState, setdummyState] = useState(1)
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        createInstance.addCard(question, answer);
        localStorage.setItem('deck', JSON.stringify(createInstance.getDeck()));
        AddToFlashcardArr();
        //readASingleDocument();
        //listenToADocument();
    }

    const prevCard = () => (
        createInstance.goToPrevious(),
        setdummyState(dummyState * -1)
    );

    const nextCard = () => (
        createInstance.goToNextCard(),
        setdummyState(dummyState * -1)
    );

    return (
        <div>
            <div>Create</div>
            <form className="answerSubmission" onSubmit={handleSubmit}>
                <input value={createInstance.getCardQuestionRaw()} type="text" /><br/>
                <input value={createInstance.getCardAnswerRaw()} type="text" /><br/>
                <button type='submit' onClick={prevCard}>Prev Card</button>
                <button type='submit'>Add Card</button>
                <button type='submit' onClick={nextCard}>Next Card</button>
            </form>
        </div>
    );
}