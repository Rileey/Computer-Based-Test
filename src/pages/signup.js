import './signup.css';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SignUp = () => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [examnumber, setExamNumber] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [random, setRandom] = useState([])

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const examNumberRef = useRef();
    const confirmPasswordRef = useRef();
    let navigate = useNavigate();


    const handleFinish = async(e) => {
        e.preventDefault()

        if (
            emailRef.current.value &&
            firstnameRef.current.value &&
            lastnameRef.current.value &&
            passwordRef.current.value  &&
            examNumberRef.current.value  &&
            confirmPasswordRef.current.value  &&
            confirmPasswordRef.current.value  === passwordRef.current.value 

            ) {
                setFirstName(firstnameRef.current.value)
                setLastName(lastnameRef.current.value)
                setEmail(emailRef.current.value)
                setExamNumber(examNumberRef.current.value)
                setPassword(passwordRef.current.value)
                setConfirmPassword(confirmPasswordRef.current.value)
            }
            setSubmitted(true);
            
        
        const user = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
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
                        <div className="name">
                            <div className="firstname">
                        {submitted && !firstnameRef.current.value ? (
                            <><label htmlFor="name">firstname</label>
                            <input 
                            type="text"
                            required
                            placeholder="Please input your name" 
                            autoComplete="false" 
                            className="blue" 
                            ref={firstnameRef} />
                            </>
                        ) : (
                            <><label htmlFor="name">firstname</label>
                            <input 
                            type="text"
                            required
                            placeholder="Your name" 
                            autoComplete="false" 
                            className="initial" 
                            ref={firstnameRef} />
                            </>
                        )}
                        </div>
                        <div className="lastname">
                        {submitted && !lastnameRef.current.value ? (
                            <><label htmlFor="name">lastname</label>
                            <input 
                            type="text"
                            required
                            placeholder="Please input your name" 
                            autoComplete="false" 
                            className="blue" 
                            ref={lastnameRef} />
                            </>
                        ) : (
                            <><label htmlFor="name">lastname</label>
                            <input 
                            type="text"
                            required
                            placeholder="Your name" 
                            autoComplete="false" 
                            className="initial" 
                            ref={lastnameRef} />
                            </>
                        )}
                        </div>
                        </div>


                        <div className="signup-info">
                            <div className="email">
                        { submitted && !emailRef.current.value ? 
                    (<><label htmlFor="name">email</label>
                    <input 
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    placeholder="Please input your email" 
                    autoComplete="false" 
                    className="blue" 
                    ref={emailRef} />
                    </>) :
                (<><label htmlFor="name">email</label>
                <input 
                type="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                placeholder="Your email" 
                autoComplete="false" 
                className="initial" 
                ref={emailRef} />
                </>
                )}
                </div>

                            <div className="examnumber">
                        { submitted && 
                        !examNumberRef.current.value ?
                    (<><label htmlFor="name">examNumber</label><input type="input" name='number' placeholder="Please input your exam number" autoComplete="false" className="blue" ref={examNumberRef} /></>) : 
                    (<><label htmlFor="name">examNumber</label><input type="input" name='number' placeholder="Your exam number" autoComplete="false" className="initial" ref={examNumberRef} /></>)}
                    </div>
                    </div>

                        <div className="pass">
                            <div className="password">
                        {submitted && !passwordRef.current.value ? 
                        (<><label htmlFor="name">password</label><input type="password" name="password" placeholder="Please input your password" autoComplete="false" className="blue" ref={passwordRef} /></>) :
                        submitted && confirmPasswordRef.current.value !== passwordRef.current.value ? 
                        (<><label htmlFor="name">password</label><input type="text" name="password" value="Input the correct password" autoComplete="false" className="blue" ref={passwordRef} /></>) :
                        (<><label htmlFor="name">password</label><input type="password" name="password" placeholder="Your password" autoComplete="false" className="initial" ref={passwordRef} /></>)}
                        </div>
                        <div className="confirm">
                        <label htmlFor="name">confirm Password</label>
                        <input type="password" name='confirmPassword' placeholder="confirm Password" autoComplete="false" className="initial" ref={confirmPasswordRef} />
                        </div>
                        </div>
                        <button className="logins-button" onClick={handleFinish}>Register</button>
                    </div>
                </div>
            </div>
    )
}

export default SignUp