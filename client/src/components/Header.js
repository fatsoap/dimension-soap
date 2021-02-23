import React from 'react';
import axios from 'axios';

const Header = ({loggedin}) => {

    return(
        <div className="header" style={{backgroundColor:'lightblue'}}>
            <div className="header__logo">
                <a href="/"><img alt="logo" /></a>
            </div>
            {loggedin? <div><Dashboard /><Logout /> </div>:<div><Login /><Register /></div> }
        </div>
    );
}

const Dashboard = () => {
    return(
        <div className="header__dashboard"><a href="/dashboard">dashboard</a></div>
    );
}

const Register = () => {
    return(
        <div className="header__register"><a href="/users/register">register</a></div>
    );
}

const Login = () => {
    return(
        <div className="header__login"><a href="/users/login">login</a></div>
    );
}

const Logout = () => {
    return(
        <div className="header__logout"><a href="/users/logout">logout</a></div>
    );
}

export default Header;