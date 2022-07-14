import './quest.css'
import { useState, useEffect, useReducer, useRef, useContext } from 'react';
import Countdown from 'react-countdown'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { AuthContext } from '../authContext/authContext';
import Navbar from './navbar'
// import { createRoutesFromChildren } from 'react-router-dom';
import axios from 'axios';
// import emailjs from "@emailjs/browser"


const Quest = ({totalQuestions, loading}) => {
    const [answer, setAnswer] = useState('')
    //)
    const [pushAnswer, setPushAnswer] = useState([])
    //changing the state of the current question
	const [currentQuestion, setCurrentQuestion] = useState(0);
	//show or hide the scores
	const [showScore, setShowScore] = useState(false);
	//set score to value depending on the user.
	const [score, setScore] = useState(0);
    const [blur, setBlur] = useState('')
    const blurRef = useRef()

    const { user, dispatch } = useContext(AuthContext)
    const examnumber = user.data?.examnumber
    const user_id = user.data?.user_id
    const lastname = user.data?.lastname
    const [data, setData] = useState(
        { date: Date.now(), delay: 120000 } //2 minutes
      );
      const wantedDelay = 120000; //10 ms
    
      const getLocalStorageValue = (s) => localStorage.getItem(s)
      //[START] componentDidMount
      //Code runs only one time after each reloading
      useEffect(() => {
        const savedDate = getLocalStorageValue("end_date");
        if (savedDate != null && !isNaN(savedDate)) {
          const currentTime = Date.now();
          const delta = parseInt(savedDate, 10) - currentTime;
    
          //Do you reach the end?
          if (delta > wantedDelay) {
            //Yes we clear uour saved end date
            if (localStorage.getItem("end_date").length > 0)
              localStorage.removeItem("end_date");
          } else {
            //No update the end date with the current date
            setData({ date: currentTime, delay: delta });
          }
        }
      }, []);
      //[END] componentDidMount

    // useEffect(() => {
    //     localStorage.setItem(`question ${totalQuestions[currentQuestion].quiz_id}`, JSON.stringify(answer));
    //   }, [answer]);


    const handleBlur = (e) => {
        // const value = e.target.value
        // setAnswer({...answer, [e.target.name]: value})
        // setBlur('You chose ' +  value)
    }
    const handleChange = async (e) => {
        const value = e.target.value
        setAnswer({...answer, [e.target.name]: value})
        // alert(`You chose ${value}`)

        

        document.cookie = `question${totalQuestions[currentQuestion].quiz_id}=${value}`; 

        if (value === totalQuestions[currentQuestion].answer) {
            setScore(score + 1)
        }

        blurRef.current.style.visibility = 'visible'
        setBlur(`You chose ${value}`)
        
        console.log(`your score: ${score} your chosen value: ${value}, and the correct answer: ${totalQuestions[currentQuestion].answer}`)
        
    }
    const quiz = document.cookie.split(';').map(num => num.split('=')).reduce((acc, [k,v])=>(acc[k.trim().replace('"', '')] = v) && acc, {})
    const percentage = Math.ceil(score/totalQuestions.length * 100)
    // console.log(quiz)

      if (loading) {
        return <h2>loading...</h2>;
     }

    return (
        <div>
            <Navbar/>
            { showScore ? (
                <>
                <div className='score-section'>
					{/* You scored  <strong>  {score}  </strong>  out of {totalQuestions.length}: <strong>{Math.ceil(score/totalQuestions.length * 100)}% </strong> */}
                    EXAM COMPLETED
				</div>
                <div className="answers" id="answers">{pushAnswer}</div>
                </>
            ) : (
            <>
                <div className="exam-container">
                <span className="exam-title" key={totalQuestions[currentQuestion].question.quiz_id}>
                    GENERAL APTITUDE
                </span>
                <div className="question-container">
                    <div className="id">
                    #{currentQuestion + 1}
                    </div>
                    
                    <div className="question">

                        <span className="quest-title" >Total Questions {totalQuestions.length}</span>
                        <span>
                            <img className='question-img' src={totalQuestions[currentQuestion].question} alt="" />
                        </span>
                        <span className="help">Select an answer from the list of options</span>
                        <div className="answer-section">
                        <form className="radio-container">
                            <input type="button" className='onclick-button' onClick={handleChange} onBlur={handleBlur}value="A" />            
                            <input type="button" className='onclick-button' onClick={handleChange} onBlur={handleBlur}value="B" />
                            <input type="button" className='onclick-button' onClick={handleChange} onBlur={handleBlur}value="C" />
                            <input type="button" className='onclick-button' onClick={handleChange} onBlur={handleBlur}value="D" />
                            <input type="button" className='onclick-button' onClick={handleChange} onBlur={handleBlur}value="E" />
                        </form>

                            <p ref={blurRef} className='blur'>{blur}</p>
                        <div className="nap">
                        <input className='options-button' type="button" value="Previous" onClick={()=>{
                            if(currentQuestion > 0 ) {
                                blurRef.current.style.visibility = 'hidden'
                                setCurrentQuestion(currentQuestion - 1) 
                            }
                        }} />
                        <input className='options-button' type="button" value={currentQuestion === totalQuestions.length - 1 ? "Submit": "Next"} onClick={ async(e)=>{
                            blurRef.current.style.visibility = 'hidden'
                            if (currentQuestion < totalQuestions.length - 1){
                                setCurrentQuestion(currentQuestion + 1) 
                            } else {
                                setShowScore(true)
                                const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 } = quiz
                                await axios.post(`/score`, {user_id, examnumber, score, percentage, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, lastname })
                            }
                        }} />
                        </div>
                        </div>
                        
                       
                    </div>
                    
                    <div className="timer">
                    <span className='timer-title'>Remaining Time</span>
                    <Countdown 
                    className='time'
            date={data.date + data.delay}
            onStart={(delta) => {
              //Save the end date
              if (localStorage.getItem("end_date") == null)
                localStorage.setItem(
                  "end_date",
                  JSON.stringify(data.date + data.delay)
                );
            }}
            onComplete={() => {
              if (localStorage.getItem("end_date") != null){
                  localStorage.removeItem("end_date");
                    setShowScore(true)
              }
            }}
          />


                        {/* <CountdownCircleTimer
                            isPlaying
                            duration={120}
                            colors={['#04045f', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[30, 20, 10, 5]}
                            size={400}
                            styles={{fontSize: '25px'}}
                        >
                            {({ remainingTime }) => {
                                 document.cookie = `timer=${remainingTime}`; 
                                if (remainingTime) {
                                    // localStorage.setItem('timer', remainingTime)
                                   const { timer } = quiz
                                    // var timer = localStorage.getItem('timer')
                                    return `${remainingTime} seconds`
                                } else {
                                    setShowScore(true)
                                    // axios.post(`/score`, {examnumber, quiz})
                                }
                             }}
                        </CountdownCircleTimer> */}
                    </div>
                </div>
            </div>
            </>
            )
            }
        </div>
    )

}

export default Quest