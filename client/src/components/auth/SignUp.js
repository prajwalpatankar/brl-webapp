import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../footer/Footer';
import { message } from 'antd';

const SignUp = () => {

    // Form Data state
    const [formdata, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: ""
    })

    // to handle redirects
    const navigate = useNavigate();


    // handle form input change
    const handleFormChange = (event) => {
        setFormData({ ...formdata, [event.target.name]: event.target.value });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (formdata.password !== formdata.re_password) {
            message.error("Passwords do not match!");
            return;
        }
        console.log(formdata);
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/users/"), formdata)
            .then((response, request) => {
                message.success("Account created Successfully. Please Log In");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div className='w-screen h-screen'>
            <div className='pt-[3%]'>
                <div className='mx-auto md:w-[40rem] w-[30rem] bg-[#FFF] px-[2rem] py-[2rem] rounded-lg shadow-lg'>
                    <p className='text-[2rem] text-purple-500 text-center'>Sign up</p>
                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <div className="flex flex-col my-[1.5rem]">
                            <label for="email" className='text-purple-500 text-[1.2rem]'>First Name</label>
                            <input type="input" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="first_name" id="first_name" placeholder="John" onChange={event => handleFormChange(event)} />
                        </div>
                        <div className="flex flex-col my-[1.5rem]">
                            <label for="email" className='text-purple-500 text-[1.2rem]'>Last Name</label>
                            <input type="input" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="last_name" id="last_name" placeholder="Doe" onChange={event => handleFormChange(event)} />
                        </div>
                        <div className="flex flex-col my-[1.5rem]">
                            <label for="email" className='text-purple-500 text-[1.2rem]'>Email address</label>
                            <input type="email" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="email" id="email" placeholder="example@email.com" onChange={event => handleFormChange(event)} />
                        </div>
                        <div className="flex flex-col my-[1.5rem]">
                            <label for="password" className='text-purple-500 text-[1.2rem]'>Password</label>
                            <input type="password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="password" id="password" placeholder="Password" onChange={event => handleFormChange(event)} />
                        </div>
                        <div className="flex flex-col my-[1.5rem]">
                            <label for="password" className='text-purple-500 text-[1.2rem]'>Confirm Password</label>
                            <input type="password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="re_password" id="re_password" placeholder="Re-type Password" onChange={event => handleFormChange(event)} />
                        </div>
                        <div className='my-[1.5rem]'>
                            <Link to='/login' className="text-purple-500 no-underline">Already have an account?</Link>
                        </div>

                        <button type="submit" className="px-[1.2rem] py-[0.5rem] bg-purple-500 text-white rounded-lg mr-[0.5rem]">Sign up</button>
                        <Link to='/'><button type="submit" className="px-[1.2rem] py-[0.5rem] border border-purple-500 text-pueple-500 rounded-lg text-purple-500">Home</button></Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;