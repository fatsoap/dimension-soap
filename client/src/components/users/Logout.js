import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Logout = ({ login, onLoginChange }) => {

    const logout = () => {
        axios.get('/users/logout');
        onLoginChange(false);
    }

    return(
        <div>
            <div>r u sure to logout ?</div>
            <Link to='/' onClick={logout}>Yep</Link>
            <Link to='/'>Nope</Link>
        </div>
    )
}

export default Logout;