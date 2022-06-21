
import { useState } from "react";
import Modal from "../components/modal";
import LeftNav from "../components/leftnav"
import './createquiz.css'

const CreateQuiz = () => {
    const [show, setShow] = useState(false);
    return(
        <>
        <div className="home-container">
            <LeftNav />
            <div className="right-container">
            <div className="top-titl-e">
                <span className="toptitle">
                    Create Quiz
                </span>
            </div>
            <div className="create-form">
                <label htmlFor="">Name</label>
                <select name='name'>
                    <option value='Adventure'>Mathematics</option>
                    <option value='Comedy'>English</option>
                    <option value='Crime'>Social Studies</option>
                    <option value='Fantasy'>History</option>
                </select>
                <button className="btn create-button" onClick={() => setShow(true)}>Create Question</button>
                
            </div>
            </div>
        </div>
        {
                    show && (
                <Modal title="My Modal" closeModal={setShow} show={show}/>
                    )
                }
        </>
    )
}

export default CreateQuiz