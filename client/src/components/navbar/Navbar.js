import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { message } from 'antd';

const Navbar = () => {

    const { userToken, setUserToken } = useContext(UserContext);

    // state to identify which buttons to display
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // to handle redirects
    const navigate = useNavigate();

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
        <div className='fixed bg-[#000] w-screen h-[4.5rem] z-20'>
            <div className='flex justify-between'>
                <div>
                    <a href="https://dornsife.usc.edu/" target="_blank" rel="noreferrer"><img src="./assets/Donsife.jpg" alt="Dornsife_logo" className='h-[4.5rem]' /></a>
                </div>
                <div className='mt-[1rem] mr-[1rem]'>
                    {isLoggedIn ?
                        <>
                            <Link to='/'><button className='w-[6rem] bg-purple-500 mx-[1rem] rounded-lg text-white h-[2.2rem]' >Home</button></Link>
                            <button onClick={handleLogout} className='w-[6rem] bg-purple-500 mx-[1rem] rounded-lg text-white h-[2.2rem]' >Log Out</button>
                        </>
                        :
                        <>
                            <Link to='/login'><button className='w-[6rem] bg-purple-500 mx-[1rem] rounded-lg text-white h-[2.2rem]' >Log In</button></Link>
                            <Link to='/signup'><button className='w-[6rem] bg-purple-500 mx-[1rem] rounded-lg text-white h-[2.2rem]' >Sign Up</button></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;