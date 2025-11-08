import React, { useState, useRef } from 'react';
import CreateMode from './midlayer/CreateMode';

function Create()
{
    const exRef = useRef(new CreateMode());
    const ex = exRef.current;
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        ex.addCard(question, answer);
        localStorage.setItem('deck', JSON.stringify(ex.getDeck()));
    }

    return (
        <div>
            <div>Create</div>
            <form className="answerSubmission" onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setQuestion(e.target.value)}/><br/>
                <input type="text" onChange={(e) => setAnswer(e.target.value)}/><br/>
                <button type="submit">Add Card</button>
            </form>
        </div>
    );
}

export default Create;