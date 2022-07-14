import './leftnav.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import { useContext } from 'react'


const LeftNav = () => {

    const { user } = useContext(AuthContext)
    return (
        <div className="left-nav container">
            <div className="titl-e">
                Nigerian Navy
            </div>
            <div className="image-container">
                <div className="stock-image">
                    <img src="./stockphoto.jpeg" className="img" alt="" />
                </div>
                <div className="user">
                    <span className="username">{user.data?.firstname} {user.data?.lastname}</span>
                </div>
            </div>
            <div className="list">
                <Link to="/scores">
                <div className="list-item">
                    CheckScores
                </div>
                </Link>
                <Link to="/createQuiz">
                <div className="list-item">
                    CreateQuiz
                </div>
                </Link>
                <Link to="/editQuiz">
                <div className="list-item">
                    EditQuiz
                </div>
                </Link>
                {/* <Link to="/">
                <div className="list-item">
                    Dashboard
                </div>
                </Link> */}
                <Link to="/">
                <div className="list-item">
                    Quiz
                </div>
                </Link>
            </div>
        </div>
    )
}

export default LeftNav