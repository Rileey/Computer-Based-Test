import './exam.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Question from '../components/questions'
import Pagination from '../components/pagination'
// import { useParams } from 'react-router-dom'



const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(1);



    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            const res = await axios.get('/quiz');
            setQuestions(res.data?.data)
            setLoading(false)
        }
        fetchQuestions()
    }, [])

    if (questions.length === 0){
        return null
    } 
    console.log(questions)

    //get current questions
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestion = questions.slice(indexOfFirstQuestion, indexOfLastQuestion)

    //change page 
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div className="exam-cont">
            <Question 
            totalQuestions={questions} 
            questions={currentQuestion} 
            loading={loading}
            questionsPerPage={questionsPerPage} 
            paginate={paginate}
            />
            <Pagination 
            questionsPerPage={questionsPerPage} 
            totalQuestions={questions.length} 
            paginate={paginate}
            />
        </div>

    )
}

export default Exam