import react from 'react'
import StudyMode from "./midlayer/StudyMode"
import SignInButton from './components/SignInButton';




function Study()
{
    const ex = new StudyMode();
    return (
        <div>
            <SignInButton />
            <div>some text</div>
            <div>{ex.getCardQuestion()}</div>
            <div>{ex.getCardAnswer()}</div>
        </div>
    );
}

export default Study;