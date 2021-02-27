import React from 'react';
import axios from 'axios';
import Header from './Header';


const Home =  ({ login }) => {


    return(
        <div>
            <Header login={login} />
            <div>Home page here</div>
        </div>
    );
}

export default Home;