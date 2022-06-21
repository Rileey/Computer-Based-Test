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

    const [optionChosen, setOptionChosen] = useState('')

    useEffect(() => {
        localStorage.setItem('answers', JSON.stringify(pushAnswer));
      }, [pushAnswer]);


    //   console.log(questions, questions[0].quiz_id, "i think")
    //   console.log(totalQuestions[currentQuestion])

   


    const handleChange = (e) => {
        const value = e.target.value
        console.log(value)
        setAnswer({...answer, [e.target.name]: value})

        if (value === totalQuestions[currentQuestion].answer) {
            setScore(score + 1)
        }
        console.log(`your score: ${score} your chosen value: ${value}, and the correct answer: ${totalQuestions[currentQuestion].answer}`)
        if (currentQuestion < totalQuestions.length-1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowScore(true)
        }
            
            setPushAnswer(oldArray=>[...oldArray, value])
            console.log("pushAnswer:", pushAnswer)

        
        document.cookie = `answer=${value}`; 
        
    }

    // console.log(pushAnswer, "------")

    

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
					You scored  <bold>  {score}  </bold>  out of {totalQuestions.length}: <bold>{Math.ceil(score/totalQuestions.length * 100)}% </bold>
				</div>
                <div className="answers" id="answers">{pushAnswer}</div>
                </>
            ) : (
            <>
            {/* {questions.map(question => ( */}
                <div className="exam-container">
                <span className="exam-title" key={totalQuestions[currentQuestion].question.quiz_id}>
                    {/* {question.subject} */}
                    Subject
                </span>
                <div className="question-container">
                    <div className="id">
                    {totalQuestions[currentQuestion].quiz_id}.
                    </div>
                    
                    <div className="question">
                        {/* <img src={question.question} className="image" alt="" /> */}
                        <span className="quest-title" >Question {totalQuestions[currentQuestion].quiz_id}/{totalQuestions.length}</span>
                        <span>
                            {/* {questions[currentQuestion].question} */}
                            <img className='question-img' src={totalQuestions[currentQuestion].question} alt="" />
                        </span>
                        <span className="help">Select one from the list of answers / {totalQuestions[currentQuestion].quiz_}</span>
                        <div className="answer-section">
                            {/* {questions[currentQuestion].answer.map((answerOption) => (
							// <button onClick={(e) => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.option}</button>
                            <input type="submit" className="button" name="answer" value={answerOption.option} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}/>
						))} */}
                        <div className="radio-container">
                            <label className='label' htmlFor=""><input onChange={handleChange} className='radio' type="radio" name="option" value={totalQuestions[currentQuestion].option_1} id="radio"/>{totalQuestions[currentQuestion].option_1}</label>
                            <label className='label' htmlFor=""><input onChange={handleChange} className='radio' type="radio" name="option" value={totalQuestions[currentQuestion].option_2} id="radio"/>{totalQuestions[currentQuestion].option_2}</label>
                            <label className='label' htmlFor=""><input onChange={handleChange} className='radio' type="radio" name="option" value={totalQuestions[currentQuestion].option_3} id="radio"/>{totalQuestions[currentQuestion].option_3}</label>
                            <label className='label' htmlFor=""><input onChange={handleChange} className='radio' type="radio" name="option" value={totalQuestions[currentQuestion].option_4} id="radio"/>{totalQuestions[currentQuestion].option_4}</label>
                            <label className='label' htmlFor=""><input onChange={handleChange} className='radio' type="radio" name="option" value={totalQuestions[currentQuestion].option_5} id="radio"/>{totalQuestions[currentQuestion].option_5}</label>
                        </div>

                        <div className="nap">
                        <input className='options-button' type="button" value="Previous" onClick={()=>{
                            // setShowScore(true)
                            if(currentQuestion > 0 ) {
                                setCurrentQuestion(currentQuestion - 1) 
                            }
                        }} />
                        <input className='options-button' type="button" value="Next" onClick={()=>{
                            // setShowScore(true)
                            if (currentQuestion < totalQuestions.length-1 )
                            setCurrentQuestion(currentQuestion + 1) 
                        }} />
                        <input className='options-button' type="button" value="Submit" onClick={()=>{
                            setShowScore(true)
                        }} />
                        </div>
                        </div>
                        
                       
                    </div>
                    <div className="timer">
                        <CountdownCircleTimer
                            isPlaying
                            duration={120}
                            colors={['#04045f', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[30, 20, 10, 5]}
                            size={300}
                        >
                            {({ remainingTime }) => {
                                if (remainingTime) {
                                    return `${remainingTime} seconds`
                                } else {
                                    setShowScore(true)
                                }
                             }}
                        </CountdownCircleTimer>
                    </div>
                </div>
            </div>
            {/* ))} */}
            </>
            )
            }
        </div>
    )

}

export default Questions