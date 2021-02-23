import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Header from './Header';
import Login from './Login';
import Register from './Register';

const App = () => {

    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/users/login" >
                        <Login />
                    </Route>
                    <Route path="/users/register" >
                        <Register />
                    </Route>
                    <Route path="/dashboard" >
                        <Header />
                        <Dashboard />
                    </Route>
                    <Route path="/" >
                        <Header />
                        <Home />
                    </Route>                
                </Switch>
            </Router>
        </div>
    )
}

export default App;