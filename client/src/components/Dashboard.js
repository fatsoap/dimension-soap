import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Loading from './Loading';

const Dashboard = () => {
    const [loggedin, setLoggedin] = React.useState(false);

    useEffect(()=>{
        axios.get('/loggedin')
            .then( (res) => setLoggedin(res.data) );
    });
    if(loggedin){
        return(
            <div>
                <Header loggedin={loggedin}/>
                <div>Dashboard here</div>
            </div>
        );
    }else{
        return(<Loading />);
    }
    
}

export default Dashboard;