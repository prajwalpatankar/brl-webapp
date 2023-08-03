import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const Home = () => {

    const { userToken } = useContext(UserContext);

    // state to identify which buttons to display
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // user Authentication
    useEffect(() => {
        if (userToken === "") {
            setIsLoggedIn(false)
        }
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/jwt/verify/"), { token: localStorage.getItem('token') })
            .then(() => {
                setIsLoggedIn(true)
            })
            .catch((error) => {
                setIsLoggedIn(false)
            })
    }, [userToken])

    return (
        <div className='text-center bg-[#f8f8f8] w-screen h-screen'>
            <Navbar />
            <div className='pt-[5%] mx-auto md:w-[40%] w-[80%]'>
                <h1>A web app for USC Bio-Mechanics Research Lab</h1>
                {isLoggedIn ?
                    <div>
                        <p className='mt-[3rem]'>Select Module</p>
                        <div className='flex flex-column'>
                            <Link to='/vectorOverlay'><button className='my-[0.7rem] h-[4rem] w-[15rem] border-2 border-purple-500 rounded-lg text-[1.2rem] text-purple-500' >Vector Overlay</button></Link>
                            <Link to='/'><button className='my-[0.7rem] h-[4rem] w-[15rem] border-2 border-purple-500 rounded-lg text-[1.2rem] text-purple-500' >Module 2</button></Link>
                            <Link to='/'><button className='my-[0.7rem] h-[4rem] w-[15rem] border-2 border-purple-500 rounded-lg text-[1.2rem] text-purple-500' >Module 3</button></Link>
                            <Link to='/'><button className='my-[0.7rem] h-[4rem] w-[15rem] border-2 border-purple-500 rounded-lg text-[1.2rem] text-purple-500' >Module 4</button></Link>
                        </div>
                    </div>
                    :
                    <div className='mt-[20%]'>
                        <p>Log in to Access Lab Code Modules</p>
                        <Link to='/login'><button className='' >Log In</button></Link>
                    </div>}
            </div>
            <Footer />
        </div>
    );
};

export default Home;