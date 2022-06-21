import './questions.css'
import { useState, useEffect, useReducer, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { AuthContext } from '../authContext/authContext';
import Navbar from './navbar'


const Questions = ({totalQuestions, questions, loading, questionsPerPage}) => {
    const [answer, setAnswer] = useState('')
    //)
    const [pushAnswer, setPushAnswer] = useState([])
    //changing the state of the current question
	const [currentQuestion, setCurrentQuestion] = useState(0);
	//show or hide the scores
	const [showScore, setShowScore] = useState(false);
	//set score to value depending on the user.
	const [score, setScore] = useState(0);

    useEffect(() => {
        localStorage.setItem('answers', JSON.stringify(pushAnswer));
      }, [pushAnswer]);



   


    const handleChange = (e) => {
        const value = e.target.value
        console.log(value)
        setAnswer({...answer, [e.target.name]: value})
        questions.map(quest=>{
            if (value===quest.answer){
                setScore(score+1)
                console.log(score, `you chose ${value} answer is ${quest.answer}`)
            }
            console.log(score, `you chose ${value} answer is ${quest.answer}`) 

                console.log(score)
            
            setPushAnswer(oldArray=>[...oldArray, value])
            console.log("pushAnswer:", pushAnswer)
        })
        document.cookie = `answer=${value}`; 
        
    }

    console.log(pushAnswer, "------")

    

    const handleAnswerOptionClick = (isCorrect) => {
		//if the option is correct/right? 
		if (isCorrect) {
			//increment the score by 1
			setScore(score + 1);
		}


		// set next question to be current question + 1
		const nextQuestion = currentQuestion + 1;
        
		//if the next question is less the sum length of the total questions?
		if (nextQuestion < questions.length) {
			//on click of one of the options? move to the next question
			setCurrentQuestion(nextQuestion);
		} else {
			//if all the questions have been answered? Show the score.
			setShowScore(true);
		}
        console.log("nextquestion",nextQuestion);
	};

      if (loading) {
        return <h2>loading...</h2>;
     }

    return (
        <div>
            <Navbar/>
            { showScore ? (
                <>
                <div className='score-section'>
					You scored  <bold>  {score}  </bold>  out of {totalQuestions.length}: <bold>{score/totalQuestions.length * 100}% </bold>
				</div>
                <div className="answers" id="answers">{pushAnswer}</div>
                </>
            ) : (
            <>
            {questions.map(question => (
                <div className="exam-container">
                <span className="exam-title" key={question.quiz_id}>
                    {/* {question.subject} */}
                    Subject
                </span>
                <div className="question-container">
                    <div className="id">
                    {question.quiz_id}.
                    </div>
                    
                    <div className="question">
                        {/* <img src={question.question} className="image" alt="" /> */}
                        <span className="quest-title" >Question {question.quiz_id}/{totalQuestions.length}</span>
                        <span>
                            {/* {questions[currentQuestion].question} */}
                            <img className='question-img' src={question.question} alt="" />
                        </span>
                        <span className="help">Select one from the list of answers / {question.quiz_}</span>
                        <div className="answer-section">
                            {/* {questions[currentQuestion].answer.map((answerOption) => (
							// <button onClick={(e) => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.option}</button>
                            <input type="submit" className="button" name="answer" value={answerOption.option} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}/>
						))} */}
                        <div className="radio-container">
                            {/* <input onChange={handleChange} className='radio' type="radio" name="answer" value="A" id="radio"/> A
                            <input onChange={handleChange} className='radio' type="radio" name="answer" value="B" id="radio"/> B
                            <input onChange={handleChange} className='radio' type="radio" name="answer" value="C" id="radio"/> C
                            <input onChange={handleChange} className='radio' type="radio" name="answer" value="D" id="radio"/> D
                            <input onChange={handleChange} className='radio' type="radio" name="answer" value="E" id="radio"/> E */}







                            {
                                question.options.map(ans=>(
                                    <label className='label' htmlFor=""><input onChange={handleChange} className='radio' type="radio" name="answer" value={ans} id="radio"/> {ans}</label>
                                ))
                            }



                            {/* {
                                question.answers.map(ans=> (
                                    <input type="button" value={ans.answer} />
                                ))
                            } */}


                        </div>

                        <input className='button submit' type="button" value="Submit" onClick={()=>{
                            setShowScore(true)
                            // const element = document.createElement('a');
                            // const file = new Blob([document.getElementById('radio').value], {
                            //     type: "text/plain; charset = utf-8",
                            // });
                            // element.href = URL.createObjectURL(file);
                            // element.download = "myfile.txt";
                            // document.body.appendChild(element);
                            // element.click()
                        }} />
                        </div>
                        
                       
                    </div>
                    <div className="timer">
                        <CountdownCircleTimer
                            isPlaying
                            duration={300}
                            colors={['#04045f', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[30, 20, 10, 5]}
                            size={300}
                        >
                            {({ remainingTime }) => remainingTime} 
                        </CountdownCircleTimer>
                    </div>
                </div>
            </div>
            ))}
            </>
            )
            }
        </div>
    )

}

export default Questions