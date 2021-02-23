import React from 'react';
import axios from 'axios';
import Header from './Header';


const Home =  () => {
    const [loggedin, setLoggedin] = React.useState(false);

    React.useEffect(()=>{
        axios.get('/loggedin')
            .then( (res) => setLoggedin(res.data) );
    });

    return(
        <div>
            <Header loggedin={loggedin} />
            <div>Home page here</div>
        </div>
    );
}

export default Home;