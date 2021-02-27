import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import Logout from './users/Logout';

const App = () => {
    const [login, setLogin] = React.useState(false);

    const onLoginChange = (status) => {
        setLogin(status);
    }
  
    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/users/login" >
                        <Login onLoginChange={onLoginChange} login={login} />
                    </Route>
                    <Route path="/users/logout" >
                        <Logout onLoginChange={onLoginChange} login={login} />
                    </Route>
                    <Route path="/users/register" >
                        <Register />
                    </Route>
                    <Route path="/dashboard" >
                        <Dashboard login={login} />
                    </Route>
                    <Route path="/" >
                        <Home login={login} />
                    </Route>                
                </Switch>
            </Router>
        </div>
    )
}

export default App;