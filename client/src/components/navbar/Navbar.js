import React, { useContext, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { UserContext } from '../../contexts/UserContext';
import { message } from 'antd';

const Navbar = () => {

    const { userToken, setUserToken } = useContext(UserContext);

    // state to identify which buttons to display
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        message.success('Successfully Logged Out')
        localStorage.setItem('token', '');
        setUserToken('');
    }

    return (
        <div className='navbar'>
            {isLoggedIn ?
                <>
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