import React from 'react';
import axios from 'axios';
import Header from './Header';


const Home =  () => {
    const [loggedin, setLoggedin] = React.useState(false);

    React.useEffect(()=>{
        let isMounted = false;
        axios.get('/loggedin')
            .then( (res) => {
                if(isMounted) setLoggedin(res.data);
            });
        return () => { isMounted = false };
    });

    return(
        <div>
            <Header loggedin={loggedin} />
            <div>Home page here</div>
        </div>
    );
}

export default Home;