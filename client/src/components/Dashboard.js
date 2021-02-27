import React, { useEffect } from 'react';
import axios from 'axios';
import { Redirect  } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';

const Dashboard = ({ login }) => {
    const [loggedin, setLoggedin] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

 
    if(login){
        if(loading){
            return(<Loading />)
        } else {
            return(
                <div>
                    <Header login={login}/>
                    <div>Dashboard here</div>
                </div>
            );
        }
    } else {
        return(<Redirect  to="/users/login" />)
    }
    
}


export default Dashboard;