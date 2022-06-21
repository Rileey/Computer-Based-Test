import './signup.css';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [examnumber, setExamNumber] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [random, setRandom] = useState([])

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const examNumberRef = useRef();
    const confirmPasswordRef = useRef();
    let navigate = useNavigate();


    const handleFinish = async(e) => {
        e.preventDefault()

        if (
            emailRef.current.value &&
            nameRef.current.value &&
            passwordRef.current.value  &&
            examNumberRef.current.value  &&
            confirmPasswordRef.current.value  &&
            confirmPasswordRef.current.value  === passwordRef.current.value 

            ) {
                setName(nameRef.current.value)
                setEmail(emailRef.current.value)
                setExamNumber(examNumberRef.current.value)
                setPassword(passwordRef.current.value)
                setConfirmPassword(confirmPasswordRef.current.value)
            }
            setSubmitted(true);
            
        
        const user = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            examnumber: examNumberRef.current.value,
            password: passwordRef.current.value,
            confirmpassword: confirmPasswordRef.current.value
        }
       
        try {
            const res = await axios.post('/register', user)
            navigate('/login')
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="signup-container">
            
            <div className="signup-form-container">
            <span className="span">Register!</span>
            <div className='sign-login-form'>
                        
                        {submitted && !nameRef.current.value ? (
                            <><label htmlFor="name">fullname</label>
                            <input 
                            type="text"
                            required
                            placeholder="Please input your name" 
                            autoComplete="false" 
                            className="log-login-input" 
                            ref={nameRef} />
                            </>
                        ) : (
                            <><label htmlFor="name">fullname</label>
                            <input 
                            type="text"
                            required
                            placeholder="Your name" 
                            autoComplete="false" 
                            className="log-login-input" 
                            ref={nameRef} />
                            </>
                        )}

                        { submitted && !emailRef.current.value ? 
                    (<><label htmlFor="name">email</label>
                    <input 
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    placeholder="Please input your email" 
                    autoComplete="false" 
                    className="log-login-input" 
                    ref={emailRef} />
                    </>) :
                (<><label htmlFor="name">email</label>
                <input 
                type="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                placeholder="Your email" 
                autoComplete="false" 
                className="log-login-input" 
                ref={emailRef} />
                </>
                )}


                        { submitted && 
                        !examNumberRef.current.value ?
                    (<><label htmlFor="name">examNumber</label><input type="input" name='number' placeholder="Please input your exam number" autoComplete="false" className="log-login-input" ref={examNumberRef} /></>) : 
                    (<><label htmlFor="name">examNumber</label><input type="input" name='number' placeholder="Your exam number" autoComplete="false" className="log-login-input" ref={examNumberRef} /></>)}

                        {submitted && !passwordRef.current.value ? 
                        (<><label htmlFor="name">password</label><input type="password" name="password" placeholder="Please input your password" autoComplete="false" className="log-login-input" ref={passwordRef} /></>) :
                        submitted && confirmPasswordRef.current.value !== passwordRef.current.value ? 
                        (<><label htmlFor="name">password</label><input type="text" name="password" value="Input the correct password" autoComplete="false" className="log-login-input" ref={passwordRef} /></>) :
                        (<><label htmlFor="name">password</label><input type="password" name="password" placeholder="Your password" autoComplete="false" className="log-login-input" ref={passwordRef} /></>)}

                        <label htmlFor="name">confirm Password</label>
                        <input type="password" name='confirmPassword' placeholder="confirm Password" autoComplete="false" className="log-login-input" ref={confirmPasswordRef} />
                        
                        <button className="logins-button" onClick={handleFinish}>Register</button>
                    </div>
                </div>
            </div>
    )
}

export default SignUp