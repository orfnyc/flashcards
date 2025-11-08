import { createFileRoute } from '@tanstack/react-router'
import react, { render, useState, useRef } from 'react'
import StudyMode from "../midlayer/StudyMode"

export const Route = createFileRoute('/Study')({
  component: Study,
})

function Study() {
    const studyRef = useRef(new StudyMode());
    const studyInstance = studyRef.current;
    const [answer, setAnswer] = useState('');
    const [checkBool, setcheckBool] = useState<Boolean>(false);
    const [finalBool, setfinalBool] = useState<Boolean>(false);

    const handleSubmit = () => (
        setcheckBool(studyInstance.evaluateAnswer(answer)),
        setfinalBool(true),
        (checkBool) ? setAnswer(answer) : setAnswer('')
    );

    const prevCard = () => (
      studyInstance.goToPrevious()
    );

    const nextCard = () => (
      studyInstance.goToNextCard()
    );

    const renderBlock = (
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
        <button onClick={prevCard}>Prev Card</button>
        <button onClick={nextCard}>Next Card</button>
      </>
    );

    return renderBlock;
};