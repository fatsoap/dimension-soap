import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import Logout from './users/Logout';

const App = () => {

    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/users/login" >
                        <Login />
                    </Route>
                    <Route path="/users/logout" >
                        <Logout />
                    </Route>
                    <Route path="/users/register" >
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