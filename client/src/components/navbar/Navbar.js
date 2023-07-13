import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { UserContext } from '../../contexts/UserContext';
import { message } from 'antd';

const Navbar = () => {

    const { userToken, setUserToken } = useContext(UserContext);

    // state to identify which buttons to display
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // to handle redirects
    const navigate = useNavigate ();

    // user Authentication
    useEffect(() => {
        if (userToken !== "") {
            setIsLoggedIn(true)
        }
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/jwt/verify/"), { token: localStorage.getItem('token') })
            .then(() => {
                setIsLoggedIn(true)
            })
            .catch((error) => {
                setIsLoggedIn(false)
            })
    }, [userToken])

    // handle Logout method
    const handleLogout = () => {
        setUserToken('');
        setIsLoggedIn(false);
        message.success('Successfully Logged Out')
        localStorage.setItem('token', '');
        navigate('/')
    }

    return (
        <div className='navbar'>
            {isLoggedIn ?
                <> 
                    <Link to='/vectorOverlay'><Button className='navbar-button' >Home</Button></Link>
                    <Button onClick={handleLogout} className='navbar-button' >Log Out</Button>
                </>
                :
                <>
                    <Link to='/login'><Button className='navbar-button' >Log In</Button></Link>
                    <Link to='/signup'><Button className='navbar-button' >Sign Up</Button></Link>
                </>
            }
        </div>
    );
};

export default Navbar;