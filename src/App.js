import './App.css';
import Navbar from './components/navbar.js'
import Exam from './pages/exam.js'
import Login from './pages/login.js'
import SignUp from './pages/signup.js'
import Home from './pages/home';
import CreateQuiz from './pages/createquiz';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/createQuiz" element={<CreateQuiz/>}></Route>
        <Route path="/quiz" element={<Exam/>}></Route>
      </Routes>
    </Router>
    {/* <Navbar /> */}
    {/* <div className="App"> */}
      {/* <SignUp /> */}
      {/* <Login/> */}
      {/* <Exam /> */}
      

    {/* </div> */}
    </>
  );
}

export default App;
