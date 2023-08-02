import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

const ForgotPassword = () => {

    // Form Data state
    const [formdata, setFormData] = useState({
        email: ""
    })

    // after form submit success
    const [submitSuccessful, setSubmitsuccessfull] = useState(false);
    const [showResendLink, setShowResendUrl] = useState(false);

    // to handle redirects
    // const navigate = useNavigate();

    // handle form input change
    const handleFormChange = (event) => {
        setFormData({ ...formdata, [event.target.name]: event.target.value })
    }

    // handle login form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(formdata);
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/users/reset_password/"), formdata)
            .then((response, request) => {
                setSubmitsuccessfull(true);
                setTimeout(() => {
                    setShowResendUrl(true);
                }, 5000)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='w-screen h-screen'>
            <div className='pt-[5%]'>
                <div className='mx-auto md:w-[40rem] w-[30rem] bg-[#FFF] px-[2rem] py-[2rem] rounded-lg shadow-lg'>
                    <p className='text-[2rem] text-purple-500 text-center'>Forgot Password</p>
                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <div className="flex flex-col my-[2rem]">
                            <label for="email" className='text-purple-500 text-[1.2rem]'>Email address</label>
                            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-purple-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="email" id="email" placeholder="example@email.com" onChange={event => handleFormChange(event)} />
                        </div>
                        {submitSuccessful ?
                            <div className='my-[2rem]'>
                                <p>Password reset email sent!</p>
                                {showResendLink ?
                                    <div className='flex'>
                                        <p>Didn't get an email?&nbsp;</p>
                                        <p className='text-purple-500 no-underline hover:cursor-pointer' onClick={(event) => handleFormSubmit(event)}> Resend email</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            :
                            <></>}
                        <div className='my-[2rem]'>
                            <Link to='/login' className="text-purple-500 no-underline">Back to Log in</Link><br />
                        </div>
                        <button type="submit" className="px-[1.2rem] py-[0.5rem] bg-purple-500 text-white rounded-lg mr-[0.5rem]">Send Password Reset Link</button>
                        <Link to='/'><button type="submit" className="px-[1.2rem] py-[0.5rem] border border-purple-500 text-pueple-500 rounded-lg text-purple-500">Home</button></Link>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;