import './App.css';
import Navbar from './components/navbar.js'
import Exam from './pages/exam.js'
import CheckScore from './pages/checkScore.js'
import Login from './pages/login.js'
import SignUp from './pages/signup.js'
import Home from './pages/home';
import CreateQuiz from './pages/createquiz';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EditQuiz from './pages/editQuiz';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* <Route path="/" element={<Home/>}></Route> */}
        <Route path="/createQuiz" element={<CreateQuiz/>}></Route>
        <Route path="/editQuiz" element={<EditQuiz/>}></Route>
        <Route path="/" element={<Exam/>}></Route>
        <Route path="/scores" element={<CheckScore/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
