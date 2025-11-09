import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react';
import CreateMode from '../midlayer/CreateMode';
//import {readASingleDocument} from '../storage/storestring';
//import {listenToADocument} from '../storage/storestring';

import "../App.css"

export const Route = createFileRoute('/Create')({
    component: Create,
})

function Create()
{
    const createRef = useRef<CreateMode | null>(null);
    const [ready, setReady] = useState(false);
    const [dummyState, setdummyState] = useState<boolean>(false)
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        async function load() {
            const create = new CreateMode(); // constructor does NOT call init
            await create.init(); // async initialization
            createRef.current = create;
            setQuestion(create.getCardQuestionRaw());
            setAnswer(create.getCardAnswerRaw());

            setReady(true); // mark ready for rendering
        }
        load();
      }, []);
  
    if (!ready || !createRef.current) {
        return <p>Loading deck...</p>; // optional loading state
    }

    const createInstance = createRef.current;

    const leftArrow = (
        <svg width="189"
            height="111"
            viewBox="0 0 189 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2.1967 49.9264C-0.732227 52.8554 -0.732227 57.6041 2.1967 60.533L49.9264 108.263C52.8553 111.192 57.6041 111.192 60.533 108.263C63.4619 105.334 63.4619 100.585 60.533 97.6561L18.1066 55.2297L60.533 12.8033C63.4619 9.8744 63.4619 5.12566 60.533 2.19673C57.6041 -0.732204 52.8553 -0.732204 49.9264 2.19673L2.1967 49.9264ZM188.5 55.2297V47.7297L7.50001 47.7297V55.2297V62.7297L188.5 62.7297V55.2297Z"
                fill="black" />
        </svg>
    );

    const rightArrow = (
        <svg
            width="189"
            height="111"
            viewBox="0 0 189 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M186.303 60.533C189.232 57.6041 189.232 52.8554 186.303 49.9264L138.574 2.19673C135.645 -0.732204 130.896 -0.732204 127.967 2.19673C125.038 5.12566 125.038 9.8744 127.967 12.8033L170.393 55.2297L127.967 97.6561C125.038 100.585 125.038 105.334 127.967 108.263C130.896 111.192 135.645 111.192 138.574 108.263L186.303 60.533ZM0 55.2297V62.7297H181V55.2297V47.7297H0V55.2297Z"
                fill="black" />
        </svg>
    );

    const handleSubmit = (e: any) => 
    {
        e.preventDefault();
        createInstance.setCardAnswer(answer);
        createInstance.setCardQuestion(question);
        setQuestion(createInstance.getCardQuestionRaw());
        setAnswer(createInstance.getCardAnswerRaw());
    }

    const prevCard = () => (
        createInstance.goToPrevious(),
        setdummyState(!dummyState),
        setQuestion(createInstance.getCardQuestionRaw()),
        setAnswer(createInstance.getCardAnswerRaw())
    );

    const nextCard = () => (
        createInstance.goToNextCard(),
        setdummyState(!dummyState),
        setQuestion(createInstance.getCardQuestionRaw()),
        setAnswer(createInstance.getCardAnswerRaw())
    );

    return (
        <>
            <div>
                <title>Flashcard Create</title>
                <link rel='stylesheet' type='text/css' href='/src/App.css/' />
            </div>
            <form className='studycreatePage' onSubmit={handleSubmit}>    
                <div className='header'><p className='text'>Create</p></div>
                <div className='createMidAlignmentBox'>
                    <button 
                    className='leftArrowBox' 
                    type='submit' 
                    onClick={prevCard}>
                        {leftArrow}
                    </button>
                    <p className='createQuestionBox'>
                        <textarea 
                            className='createQuestionText' 
                            value={question} 
                            onChange={(e: any) => setQuestion(e.target.value)}
                        />
                        <button 
                        className='saveQuestionText'
                        type='submit' 
                        onClick={() => setdummyState(true)}>
                            Save
                        </button>
                    </p>
                    <button 
                    className='rightArrowBox' 

                    onClick={nextCard}>
                        {rightArrow}
                    </button>
                </div>
                <div className='studyEndBox'>
                    <div 
                    className='answerBox'>
                        <textarea 
                        className='answerText' 
                        value={answer} 
                        onChange={(e: any) => setAnswer(e.target.value)} />
                    </div>
                    <button className='addCardButton'
                        onClick={() => (
                            createInstance.addCard('', ''),
                            setQuestion('Question'),
                            setAnswer('Answer'),
                            createInstance.goToNextCard()
                        )}>
                        <p className='smallButtonText' >
                            New <br />Card
                        </p>
                    </button>
                </div>
            </form>
        </>
    );
}