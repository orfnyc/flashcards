import React, { useState } from 'react'
import StudyMode from './midlayer/StudyMode'


function Create() {
    const studyInstance = new StudyMode();
    const [answer, setAnswer] = useState('');
    const [checkBool, setcheckBool] = useState<Boolean>(false);
    const [finalBool, setfinalBool] = useState<Boolean>(false);

    const handleSubmit = () => (
        setcheckBool(studyInstance.evaluateAnswer(answer)),
        setfinalBool(true)
    );

    const nextCard = () => (
        studyInstance.goToNextCard()
    );

    return (
        <>
            <p>{studyInstance.getCardQuestion()}</p>
            <label >
                Answer: 
            </label>
            <input
                value={answer}
                name='answer'
                type='string'
                onChange={e => setAnswer(e.target.value)} />
            <button onClick={handleSubmit}>Submit Answer</button>
            <p>{(finalBool) ? checkBool.toString() : ''}</p>
            <p>{(finalBool && !checkBool) ? ('The answer is actually:' + studyInstance.getCardAnswer()) : ''}</p>
            <button onClick={nextCard}>Next Card</button>
        </>
    )
};

export default Create;