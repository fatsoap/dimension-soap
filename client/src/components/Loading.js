import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Loading = () => {


    return(
        <div>
            <div>Loading... or you are not loggedin yet</div>
            <Link to='/users/login' >Go to login</Link>
        </div>
    )
}

export default Loading;
