import './login.css'
import { useContext, useEffect, useState } from 'react'
import { login } from '../authContext/apicalls';
import { AuthContext } from '../authContext/authContext';
import { useNavigate } from 'react-router-dom'


const Login = () => {   

    const [examnumber, setExamNumber] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [random, setRandom] = useState([])
    const [submitted, setSubmitted] = useState(false)
    let navigate = useNavigate()
    const { isFetching, error, dispatch } = useContext(AuthContext)
    
    const handleClick = async(e) => {
        e.preventDefault()
        setSubmitted(true)
        try {
            login({examnumber, password}, dispatch)
            if (!examnumber|| !password) {
                setMessage('Input all fields')
            } else if (error){
                setMessage('Incorrect email or password')
            } else if (!error){
                setMessage('Success')
            }
            navigate('/')
            
        } catch (err) {
            console.log(err)
        }
       
    }
    return (
        <div className='login-container' >
            <div className="login-form-container">
            { submitted ? 
                        (<p
                        style={{
                            color: 'white',
                            padding: '10px',
                            fontWeight: '600',
                            backgroundColor: 'black'
                        }}>{message}</p>) : null}
                        {submitted && !examnumber ?
                            (<><label htmlFor="examNumber">examnumber</label><input type="number" className='red' placeholder='Please input the correct examNumber' autoComplete='false' onChange={(e) => setExamNumber(e.target.value)}/></>) :
                            (<><label htmlFor="examNumber">examnumber</label><input type="number" placeholder='Your examNumber' onChange={(e) => setExamNumber(e.target.value)}/></>)
                        }
                        {submitted && !password ?
                            (<><label htmlFor="examNumber">Password</label><input type="password" className='red' placeholder='Please input the correct Password' autoComplete='false' onChange={(e) => setPassword(e.target.value)}/></>) :
                            (<><label htmlFor="examNumber">Password</label><input type="password" placeholder='Your Password' onChange={(e) => setPassword(e.target.value)}/></>)
                        }
            <button onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default Login