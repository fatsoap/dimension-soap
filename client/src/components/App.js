import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Header from './Header';
import Login from './Login';
import Register from './Register';

const App = () => {
    //const [data, setData] = React.useState('Loading...');

    // React.useEffect(() => {
    //     const get = axios.get('/api')
    //         .then((res)=> res.data.message)
    //         .then((data)=> setData(data+' using then'));
    // }, []);

    return(
        <div>
            <Header />
            <Router>
                <Switch>
                    <Route path="/login" >
                        <Login />
                    </Route>
                    <Route path="/register" >
                        <Register />
                    </Route>
                    <Route path="/dashboard" >
                        <Dashboard />
                    </Route>
                    <Route path="/" >
                        <Home />
                    </Route>                
                </Switch>
            </Router>
        </div>
    )
}

export default App;