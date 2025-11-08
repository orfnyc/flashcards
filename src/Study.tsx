// import react, { useState } from 'react'
// import StudyMode from "./midlayer/StudyMode"

// function Study()
// {
//     const ex = new StudyMode();
//     const [answer, setAnswer] = useState("");

//     const handleSubmit = (e: react.FormEvent<HTMLFormElement>) => 
//     {
//         e.preventDefault();
//         ex.evaluateAnswer(answer);
//         setAnswer("");
//     }
//     return (
//         <div>
//             <div>some text</div>
//             <div>{ex.getCardQuestion()}</div>
//             <form className="answerSubmission" onSubmit={handleSubmit}>
//                 <input type="text" onChange={(e) => setAnswer(e.target.value)}/>
//                 <button type="submit">Submit Answer</button>
//             </form>
//         </div>
//     );
// }

// export default Study;

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
        </>
    )
};

export default Create;