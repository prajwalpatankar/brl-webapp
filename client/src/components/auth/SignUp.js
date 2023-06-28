import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate   } from 'react-router-dom';
import axios from 'axios';


import { Container } from 'react-bootstrap';
import { message } from 'antd';

const SignUp = () => {

    // destructuring context
    const { userDetails, setUserDetails } = useContext(UserContext);

    // Form Data state
    const [formdata, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: ""
    })

    // error message states
    const [passwordErr, setPasswordErr] = useState("");
    const [rePasswordErr, setRePasswordErr] = useState(" ");

    // to handle redirects
    const navigate = useNavigate ();


    // handle form input change
    const handleFormChange = (event) => {
        setFormData({ ...formdata, [event.target.name]: event.target.value });
        if (formdata.password === formdata.re_password) {
            setRePasswordErr(" ")
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (formdata.password === "") {
            setPasswordErr("Password is required");
            return
        } else {
            setPasswordErr("");
        }
        if (formdata.password !== formdata.re_password) {
            setRePasswordErr("Passwords do not match!");
            return;
        } else {
            setRePasswordErr(" ")
        }
        console.log(formdata);
        axios.post(process.env.REACT_APP_SERVER_URL.concat("api/v1/auth/users/"), formdata)
            .then((response,request) => {
                message.success("Account created Successfully. Please Log In");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div>
            <Container fluid='true'>
                <div className="col-md-6">
                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <div class="form-group">
                            <label for="name">First Name</label>
                            <input type="text" class="form-control" name="first_name" id="first_name" placeholder="Enter First Name" onChange={event => handleFormChange(event)} />
                        </div>
                        <div class="form-group">
                            <label for="name">Last Name</label>
                            <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Enter Last Name" onChange={event => handleFormChange(event)} />
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={event => handleFormChange(event)} />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" id="password" aria-describedby="passwordHelp" placeholder="Password" onChange={event => handleFormChange(event)} />
                            <small id="passwordHelp" class="form-text text-muted">{passwordErr}</small>
                        </div>
                        <div class="form-group">
                            <label for="re_password">Confirm Password</label>
                            <input type="password" class="form-control" name="re_password" id="re_password" aria-describedby="re_passwordHelp" placeholder="Confirm Password" onChange={event => handleFormChange(event)} />
                            <small id="re_passwordHelp" class="form-text text-muted red">{rePasswordErr}</small>
                        </div>
                        <div>
                            <Link to='/login'>Already have an account?</Link>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign UP</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default SignUp;