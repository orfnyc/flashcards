import react from 'react'
import StudyMode from "./midlayer/StudyMode"

function Study()
{
    const ex = new StudyMode();
    return (
        <div>
            <div>some text</div>
            <div>{ex.getCardQuestion()}</div>
            <div>{ex.getCardAnswer()}</div>
        </div>
    );
}

export default Study;