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

    const [hasSubmitted, sethasSubmitted] = useState<boolean>(false);

    const submittedSVG = (
      <svg
        width="122"
        height="112"
        viewBox="0 0 122 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M120 55.7805L0.5 0.780518V47.7805L93 55.7805L0.5 63.7805V110.781L120 55.7805Z"
          fill="#4D9A7C"
          fill-opacity="0.71"
          stroke="#4D9A7C"
          stroke-opacity="0.71" />
      </svg>
    );

    const nextSVG = (
      <svg width="189"
        height="111"
        viewBox="0 0 189 111"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M186.303 60.533C189.232 57.6041 189.232 52.8554 186.303 49.9264L138.574 2.19673C135.645 -0.732204 130.896 -0.732204 127.967 2.19673C125.038 5.12566 125.038 9.8744 127.967 12.8033L170.393 55.2297L127.967 97.6561C125.038 100.585 125.038 105.334 127.967 108.263C130.896 111.192 135.645 111.192 138.574 108.263L186.303 60.533ZM0 55.2297V62.7297H181V55.2297V47.7297H0V55.2297Z" fill="black" />
        </svg>
    )

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
        (checkBool) ? setAnswer(answer) : setAnswer(''),
        sethasSubmitted(true)
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
          <div className='header'>
            <p className='text'>
              Study
            </p>
          </div>
            <p 
              className='studyquestionBox'>
              {studyInstance.getCardQuestion()}
            </p>
            
            <label >
              Answer:
            </label>
            <div className='studyEndBox'>
              <div className='answerBox'>
                <textarea
                  className='answerText'
                  value={answer}
                  name='answer'
                  onChange={e => setAnswer(e.target.value)} 
                ></textarea>
              </div>
              
              <button 
              className='submitSendBox'
              onClick={handleSubmit}>
                {(!hasSubmitted) ? submittedSVG : nextSVG}
              </button>
            </div>
            
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