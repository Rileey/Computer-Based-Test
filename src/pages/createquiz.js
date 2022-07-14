
import { useState } from "react";
import axios from 'axios';
import LeftNav from "../components/leftnav"
import './createquiz.css'

const CreateQuiz = () => {
    const [file, setFile] = useState({})
    const [quiz, setQuiz] = useState({})
    const [isChosen, setIsChosen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setQuiz({...quiz, [e.target.name]: value})
        // console.log('riley----', file, quiz)
    }

    const handleSubmit = async(e) => {
        setIsLoading(true)
        e.preventDefault()
    let formdata = new FormData()
    for (let i = 0; i < file.length; i++) {
        formdata.append('question', file[i], file[i].name)
      }
    formdata.append('answer', quiz.answer)

    const response =  await axios.post('/quiz', formdata)
    window.location.reload()
    setIsLoading(false)
    console.log(response, 'responsee')
    }

    return(
        <div className="home-container">
            <LeftNav />
            <div className="right-container">
            <div className="top-titl-e">
                <span className="toptitle">
                    Create Quiz
                </span>
            </div>
            <form className="create-form" onSubmit={handleSubmit}>
                <label htmlFor="">Upload Question.</label>
                <div className="upload-img">
                    <div className="box">
                        <button className="image-button"> Choose Image </button>
                        <input type="file" id="image" className="file" name="question" onChange={(e)=> {
                            setFile(e.target.files, console.log(e.target.files))
                            setIsChosen(true)
                            }}/>
                             {
                            isChosen ? (
                                <span className="file-upload-s">{file[0]?.name}</span>
                            ) : (
                                null
                            )
                        }
                    </div>
                    
                </div>
                <div className="answer-container">
                <label htmlFor="">Choose Answer</label>
                <select className="option" name='answer' onChange={handleChange}>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                    <option value='E'>E</option>
                </select>
                </div>
                {
                    isLoading ? (
                        <>
                        <button className="image-button" >Creating...</button>
                        </>
                    ) : (
                        <>
                        <button className="image-button" >Create Question</button>
                        </>
                    )
                }
            </form>
            </div>
        </div>
    )
}

export default CreateQuiz