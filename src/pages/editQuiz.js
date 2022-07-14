import './editQuiz.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash } from "react-icons/fa";




const EditQuiz = () => {

    const [quiz, setQuiz] = useState([])
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')
    const [image, setImage] = useState({})
    const [file, setFile] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    // const [answer, setAnswer] = useState('')

    useEffect(()=> {
        const getScore = async () => {
            const { data } = await axios.get(`/quiz`)
            setQuiz(data.data)
        }
        getScore()
    }, [])

    const sortedQuiz = quiz.sort((a, b)=> {
        return a.quiz_id - b.quiz_id;
    })

    if (quiz.length === 0 || quiz === []){
        return null
    } else {
        console.log(quiz) 
    }

    const handleChange = () => {

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
             let formdata = new FormData()
                for (let i = 0; i < file.length; i++) {
                    formdata.append('question', file[i], file[i].name)
                }
                // formdata.append('answer', answer)

            // data.append('userId', user._id) 
            // if(person.username){
            //     data.append('username', person.username)
            // }
            // if(person.phone) {
            // data.append('phone', person.phone)
            // }
            // if(person.about) {
            // data.append('about', person.about)
            // }
            // if (!image) {
            //     data.append('profilePicture', person.profilePicture[0]?.profilePicture)
            // }else {
            // for (let i = 0; i < image.length; i++) {
            //     data.append('profilePicture', image[i], image[i].name)
            // }
            // try {
            //     await axios.put(`/users/${user._id}`, data )
            //     setLoading(false)
            //     if (error){
            //         setMessage('Username has been TAKEN!!!')
            //         console.log('just error---', error)
            //     }
            //     window.location.reload()
            // } catch (err) {
            //     console.log(err);
            // }
        // }
    }

    return (
        <div className='quiz-list-container'>
            <div className="search">
                <input className="search-bar" type="search" name="" id="" placeholder="Enter Quiz id" onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            {/* <table>
                <tr>
                    <th>Exam Number</th>
                    <th>Score / 50</th>
                </tr>
                {score.map(result=>(
                    <>
                <tr >
                    <td key={result.result_id}>{result.examnumber}</td>
                    <td>{result.score}</td>
                </tr>
                    </>
                ))}
            </table> */}
            <div className="score-list-sub">
            <div className="question-list-item">
                <span className="score-header">Quiz id</span>
                <div className="score-header">
                <span className="score-header">Question</span>
                {
                            file ? (
                                <span className="file-upload-data">{image[0]?.name}</span>
                            ) : (
                                null
                            )
                        }
                </div>
                <span className="score-header">Answer</span>
                <span className="score-header">Delete</span>
                <span className="score-header">Save</span>
            </div>
            {sortedQuiz.filter(result=>{
                if (search === ''){
                    //if search input is empty
                    return result
                    //return everything
                } else if (result.quiz_id.toLowerCase().includes(search.toLowerCase())){
                    //if the lastname of the data includes the values in
                    return result
                }
            }).map(result=>(
                <div className="questions-list-item" key={result.quiz_id}>
                <span className="score-item">{result.quiz_id}</span>
                <div className="picture">
                    <img className='quiz_image' src={result.question} alt="" />
                    <input type="file" id='image' name="profilePicture" className='modd-image' accept= "image/png, image/jpeg" onChange={(e)=>{
                        setImage(e.target.files)
                        setFile(true)
                    }}/>
                        
                </div> 
                    <span className="score-item ans">{result.answer}</span>
                <span className="trash"><FaTrash /></span>
                <input type="button" className='save' value="Save" onClick={()=>setShow(true)}/>
            </div>
            ))}
            
            </div>
            {
                show && (
                    <div className="modal-container">
                        <div className="modal-body">
                            <label htmlFor="" className='modal-label'></label>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default EditQuiz