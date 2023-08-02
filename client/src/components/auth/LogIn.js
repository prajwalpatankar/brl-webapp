import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const LogIn = () => {

    // destructuring context
    const { setUserToken } = useContext(UserContext);

    // Form Data state
    const [formdata, setFormData] = useState({
        email: "",
        password: ""
    })

    // to handle redirects
    const navigate = useNavigate();

    // useEffect(() => {
    //     setUserToken(localStorage.getItem('token'));
    // })


    // handle form input change
    const handleFormChange = (event) => {
        setFormData({ ...formdata, [event.target.name]: event.target.value })
    }

    // handle login form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(formdata);
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/jwt/create/"), formdata)
            .then((response, request) => {
                setUserToken(response.data.access);
                localStorage.setItem('token', response.data.access);
                navigate('/vectorOverlay');
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='w-screen h-screen'>
            <div className='pt-[5%]'>
            <div className='mx-auto md:w-[40rem] w-[30rem] bg-[#FFF] px-[2rem] py-[2rem] rounded-lg shadow-lg'>
                <p className='text-[2rem] text-purple-500 text-center'>Login</p>
                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <div className="flex flex-col my-[2rem]">
                        <label for="email" className='text-purple-500 text-[1.2rem]'>Email address</label>
                        <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="email" id="email" placeholder="example@email.com" onChange={event => handleFormChange(event)} />
                    </div>
                    <div className="flex flex-col my-[2rem]">
                        <label for="password" className='text-purple-500 text-[1.2rem]'>Password</label>
                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="password" id="password" placeholder="Password" onChange={event => handleFormChange(event)} />
                    </div>
                    <div className='my-[2rem]'>
                        <Link to='/forgotPassword' className="text-purple-500 no-underline">Forgot Password?</Link><br />
                        <Link to='/signup' className="text-purple-500 no-underline">Don't have an account?</Link>
                    </div>
                    <button type="submit" className="px-[1.2rem] py-[0.5rem] bg-purple-500 text-white rounded-lg mr-[0.5rem]">Log in</button>
                    <Link to='/'><button type="submit" className="px-[1.2rem] py-[0.5rem] border border-purple-500 text-pueple-500 rounded-lg text-purple-500">Home</button></Link>
                </form>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default LogIn;