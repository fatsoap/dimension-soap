import React from 'react';
import logo from './flatlogo.png';
import { Link } from "react-router-dom";
import axios from 'axios';
import Login from './users/Login';
import Register from './users/Register';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = ({login, onLoginChange }) => {

    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><img alt="logo" src={logo} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Dashboard login={login} />
                    <LoginModal login={login} onLoginChange={onLoginChange} />
                    <RegisterModal login={login} onLoginChange={onLoginChange} />
                    <Logout login={login} onLoginChange={onLoginChange} />
                </Nav>      
            </Navbar.Collapse>
        </Navbar>
    );
}

// className="btn btn-primary"

const Dashboard = ({ login }) => {
    return(
        <Nav.Item style={login? {} : {display:"none"}}>
            <Button variant="light" >
                <Link to="/dashboard" style={{ textDecoration: 'none', color: "black" }}>
                    Dashboard
                </Link>
            </Button>
        </Nav.Item>
    )
}

const LoginModal = ({ login, onLoginChange }) => {
    return(
        <Nav.Item style={login? {display:"none"} : {} }>
            <Login onLoginChange={onLoginChange} />
        </Nav.Item>
    );
};

const RegisterModal = ({ login, onLoginChange }) => {
    return(
        <Nav.Item style={login? {display:"none"} : {} }>
            <Register onLoginChange={onLoginChange} />
        </Nav.Item>
    );
};



const Logout = ({ login, onLoginChange }) => {
    const logout = (e) => {
        e.preventDefault();
        onLoginChange(false);
        axios.get('/users/logout');
        
    }

    return(
        <Nav.Item variant="light" style={login? {} : {display:"none"}}>
            <Button variant="light" onClick={logout} >
                <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                    Logout
                </Link>
            </Button>
        </Nav.Item>
    );
};



export default Header;