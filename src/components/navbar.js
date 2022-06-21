import './navbar.css'
import { AuthContext } from '../authContext/authContext';
import logo from '../images/dnedlogo2.png'
import { useContext } from 'react';

const NavBar = () => {

        const { user, dispatch } = useContext(AuthContext)
        // console.log(user)
    return(
        <div className="nav-container">
            <div className="left">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="school">
                <span className="title">
                    Nigerian Navy CBT Platform
                </span>
            </div>
            </div>
            <div className="right">
            <div className="user-details">
                <div className="user-name">
                    {user.data.firstname} <strong>{user.data.lastname}</strong>
                </div>
                <div className="user-number">
                {user.data.examnumber}
                </div>
            </div>
            {/* <div >
                <button className="submit" type="submit">Submit</button>
            </div> */}
            </div>
        </div>
    )
}

export default NavBar;