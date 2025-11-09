import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import StudyMode from "../midlayer/StudyMode"

export const Route = createFileRoute('/Study')({
  component: Study,
})

function Study() {
    const studyRef = useRef<StudyMode | null>(null);
    const [ready, setReady] = useState(false);
    const [dummyState, setdummyState] = useState(1);
    const [answer, setAnswer] = useState('');
    const [checkBool, setcheckBool] = useState<Boolean>(false);
    const [finalBool, setfinalBool] = useState<Boolean>(false);

    useEffect(() => {
      async function load() {
        const study = new StudyMode(); // constructor does NOT call init
        await study.init(); // async initialization
        studyRef.current = study;
        setReady(true); // mark ready for rendering
      }
      load();
    }, []);

    if (!ready || !studyRef.current) {
      return <p>Loading deck...</p>; // optional loading state
    }
    const studyInstance = studyRef.current;
    const handleSubmit = () => (
        setcheckBool(studyInstance.evaluateAnswer(answer)),
        setfinalBool(true),
        (checkBool) ? setAnswer(answer) : setAnswer('')
    );

    const nextCard = () => (
      studyInstance.goToNextCard(),
      setdummyState(dummyState * -1),
      setcheckBool(false),
      setfinalBool(false)
    );

    const renderBlock = (
      <>
        <div className='studycreatePage'>
          <p 
            className='studyquestionBox'>
            {studyInstance.getCardQuestion()}
          </p>
          
          <label >
            Answer:
          </label>
          <input
            className=''
            value={answer}
            name='answer'
            type='string'
            onChange={e => setAnswer(e.target.value)} 
          />
          
          <button 
          onClick={handleSubmit}>
            Submit Answer
          </button>

          <p className='text' 
          key={dummyState}>
            {(finalBool) ? (checkBool) ? 'Correct! Good job :)' : 'Sorry, thats not correct :(' : ''}
          </p>

          <p>
            {(finalBool && !checkBool) ? ('The answer is actually:' + studyInstance.getCardAnswer()) : ''}
          </p>
          
          <button 
          onClick={nextCard}>
            Next Card
          </button>
        </div>
      </>
    );

    return renderBlock;
};