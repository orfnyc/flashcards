import react, { useState } from 'react'
import StudyMode from "./midlayer/StudyMode"
import SignInButton from './components/SignInButton';
//import StoreString from './storage/storestring';


function Study()
{
    const ex = new StudyMode();
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e: react.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        ex.evaluateAnswer(answer);
        setAnswer("");
    }
    return (
        <div>
            <SignInButton />

            <div>some text</div>
            <div>{ex.getCardQuestion()}</div>
            <form className="answerSubmission" onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setAnswer(e.target.value)}/>
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
}

export default Study;