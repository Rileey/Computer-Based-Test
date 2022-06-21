import LeftNav from "../components/leftnav"
import './home.css'

const Home = () => {
    return(
        <div className="home-container">
            <LeftNav/>
            <div className="right-container">
            <div className="top-titl-e">
                <span className="toptitle">
                    Quizzes
                </span>
            </div>
            <div className="quizzes">
                <div className="card">
                    Mathematics
                </div>
                <div className="card">
                    English
                </div>
                <div className="card">
                    Social Studies
                </div>
                <div className="card">
                    History
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home