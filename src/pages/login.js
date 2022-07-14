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
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    console.log("anthena:", error)
    
    const handleClick = async(e) => {
        e.preventDefault()
        setSubmitted(true)
        try {
            login({examnumber, password}, dispatch)
            if (error){
                setMessage(error.data?.message)
            }
            if (!error) {
                navigate('/')
                setMessage(user.message)
            }
            
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
                            (<><label htmlFor="examnumber" className='login-label'>examnumber</label><input type="number" className='blue' placeholder='examnumber cannot be empty' autoComplete='false' onChange={(e) => setExamNumber(e.target.value)}/></>) :
                            (<><label htmlFor="examnumber" className='login-label'>examnumber</label><input type="number" className='initial' placeholder='examnumber' onChange={(e) => setExamNumber(e.target.value)}/></>)
                        }
                        {submitted && !password ?
                            (<><label htmlFor="password" className='login-label'>password</label><input type="password" className='blue' placeholder='password cannot be empty' autoComplete='false' onChange={(e) => setPassword(e.target.value)}/></>) :
                            (<><label htmlFor="password" className='login-label'>password</label><input type="password" className='initial' placeholder='password' onChange={(e) => setPassword(e.target.value)}/></>)
                        }
            <button onClick={handleClick} className='login-submit'>Login</button>
            </div>
        </div>
    )
}

export default Login