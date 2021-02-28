import React from 'react';
import logo from './flatlogo.png';
import axios from 'axios';

const Header = ({loggedin}) => {

    return(
        <div className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container-fluid"> 
            <div className="navbar-brand">
                <a href="/"><img alt="logo" src={logo} /></a>
            </div>
            <div class="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a className="nav-link active" href="/dashboard">dashboard</a></li>
                    <li class="nav-item"><a href="/users/register">register</a></li>
                    <li class="nav-item"><a href="/users/login">login</a></li>
                    <li class="nav-item"><a href="/users/logout">logout</a></li>
                    <li class="nav-item"></li>
                </ul>
            </div>
            <Dashboard />
            {loggedin? <div><Logout /> </div>:<div><Login /><Register /></div> }
            </div>
        </div>
    );
}

const Dashboard = () => {
    return(
        <div className="header__dashboard"></div>
    );
}

const Register = () => {
    return(
        <div className="header__register"></div>
    );
}

const Login = () => {
    return(
        <div className="header__login"></div>
    );
}

const Logout = () => {
    return(
        <div className="header__logout"></div>
    );
}

export default Header;