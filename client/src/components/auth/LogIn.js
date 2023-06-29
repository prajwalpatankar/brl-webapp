import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Auth.css';
import { Container } from 'react-bootstrap';

const LogIn = () => {

    // destructuring context
    const { setUserToken } = useContext(UserContext);

    // Form Data state
    const [formdata, setFormData] = useState({
        email: "",
        password: ""
    })

    // to handle redirects
    const navigate = useNavigate ();

    // useEffect(() => {
    //     setUserToken(localStorage.getItem('token'));
    // })


    // handle form input change
    const handleFormChange = (event) => {
        setFormData({...formdata, [event.target.name]: event.target.value})
    }

     // handle login form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(formdata);
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/jwt/create/"), formdata)
            .then((response,request) => {
                setUserToken(response.data.access);
                localStorage.setItem('token', response.data.access);
                navigate('/vectorOverlay');
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Container fluid='true'>
                <h4>Login</h4>
                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={event => handleFormChange(event)} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password" onChange={event => handleFormChange(event)} />
                    </div>
                    <div>
                        <Link to='/forgotPassword'>Forgot Password?</Link><br />
                        <Link to='/signup'>Don't have an account?</Link>
                    </div>
                    <button type="submit" class="btn btn-primary">Log in</button>
                </form>
            </Container>
        </div>
    );
};

export default LogIn;