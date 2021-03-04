import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import Header from './Header';
import NewArticle from './article/NewArticle';
import Article from './article/Article';
import UpdateArticle from './article/UpdateArticle';

import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    
    const [login, setLogin] = React.useState(false);
    const [user, setUser] = React.useState({});

    useEffect(() => {
        axios.get('/checkLogin')
        .then((res)=>{
            setLogin(res.data.login);
            setUser(res.data.user);
        }
    )
    }, [login]);

    const onLoginChange = (status) => {
        setLogin(status);
    }

    const onUserChange = (newUser) => {
        setUser(newUser);
    }
  
    return(
        <Container>      
            <Router>  
                <Header onLoginChange={onLoginChange} login={login} onUserChange={onUserChange} user={user} />              
                <Switch>
                    <Route path="/dashboard" >
                        <Dashboard login={login} />
                    </Route>
                    <Route path="/article/new" >
                        <NewArticle login={login} user={user}/>
                    </Route>
                    <Route path="/article/update/:slug" >
                        <UpdateArticle login={login} />
                    </Route>
                    <Route path="/article/:slug" >
                        <Article login={login} user={user} />
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