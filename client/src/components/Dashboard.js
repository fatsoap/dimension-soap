import React, { useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';

const Dashboard = ({ login }) => {
    const [loading, setLoading] = React.useState(false);

    if(!login){
        return(
            <Redirect to="/"></Redirect>
        )
    }
    
    if(loading){
        return(<Loading />)
    } else {
        return(
            <div className="">
                <div>Dashboard here</div>
            </div>
        );
    }    
}


export default Dashboard;