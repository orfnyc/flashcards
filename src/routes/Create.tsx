import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useRef } from 'react';
import CreateMode from '../midlayer/CreateMode';

export const Route = createFileRoute('/Create')({
    component: Create,
})


function Create()
{
    const createRef = useRef(new CreateMode());
    const createInstance = createRef.current;
    const [dummyState, setdummyState] = useState(1)
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        createInstance.addCard(question, answer);
        localStorage.setItem('deck', JSON.stringify(createInstance.getDeck()));
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
                <input type="text" onChange={(e) => setQuestion(e.target.value)}/><br/>
                <input type="text" onChange={(e) => setAnswer(e.target.value)}/><br/>
                <button type={prevCard}>Prev Card</button>
                <button type='submit'>Add Card</button>
                <button type={nextCard}>Next Card</button>
            </form>
        </div>
    );
}