import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/login'><Button className='navbar-button' >Log In</Button></Link> 
            <Link to='/signup'><Button className='navbar-button' >Sign Up</Button></Link> 
        </div>
    );
};

export default Navbar;