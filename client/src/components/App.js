import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import Header from './Header';

import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [login, setLogin] = React.useState(true);

    const onLoginChange = (status) => {
        setLogin(status);
    }
  
    return(
        <Container>      
            <Router>  
                <Header onLoginChange={onLoginChange} login={login} />              
                <Switch>
                    <Route path="/dashboard" >
                        <Dashboard login={login} />
                    </Route>
                    <Route path="/" >
                        <Home login={login} />
                    </Route>                
                </Switch>
            </Router>
        </Container>
    )
}

export default App;