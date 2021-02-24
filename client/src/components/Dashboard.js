import React, { useEffect } from 'react';
import axios from 'axios';
import { Redirect  } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';

const Dashboard = () => {
    const [loggedin, setLoggedin] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(()=>{
        let isMounted = true;
        axios.get('/loggedin')
            .then( (res) => {
                if(isMounted){
                    setLoggedin(res.data);
                    setLoading(false);
                }
            });
        return () => { isMounted = false };
    });
    if(loggedin){
        return(
            <div>
                <Header loggedin={loggedin}/>
                <div>Dashboard here</div>
            </div>
        );
    }else if(loading){
        return(<Loading />);
    }else {
        return(<Redirect  to="/users/login" />)
    }
    
}


export default Dashboard;