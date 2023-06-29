import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Auth.css';
import { Container } from 'react-bootstrap';

const ForgotPassword = () => {

    // Form Data state
    const [formdata, setFormData] = useState({
        email: ""
    })

    // after form submit success
    const [submitSuccessful, setSubmitsuccessfull] = useState(false);
    const [showResendLink, setShowResendUrl] = useState(false);

    // to handle redirects
    const navigate = useNavigate();

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
        <div>
            <Container fluid='true'>
                <h4>Forgot Password</h4>
                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={event => handleFormChange(event)} />
                        <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                    <div>
                        <Link to='/login'>Back to Login</Link>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Email</button>
                </form>
                {submitSuccessful ?
                    <>
                        <p>Password reset email sent!</p>
                        {showResendLink ?
                            <div className='resend-email'>
                                <p>Didn't get an email?&nbsp;</p>
                                <p className='link' onClick={(event) => handleFormSubmit(event)}> Resend email</p>
                            </div>
                            :
                            <></>
                        }
                    </>
                    :
                    <></>}
            </Container>
        </div>
    );
};

export default ForgotPassword;