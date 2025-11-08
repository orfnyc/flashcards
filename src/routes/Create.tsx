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
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        createInstance.addCard(question, answer);
        localStorage.setItem('deck', JSON.stringify(createInstance.getDeck()));
    }

    return (
        <div>
            <div>Create</div>
            <form className="answerSubmission" onSubmit={handleSubmit}>
                <input value={createInstance.} type="text" onChange={(e) => setQuestion(e.target.value)}/><br/>
                <input value={} type="text" onChange={(e) => setAnswer(e.target.value)}/><br/>
                <button type='submit'>Add Card</button>
            </form>
        </div>
    );
}