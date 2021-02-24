import React, { useEffect } from 'react';
import axios from 'axios';
import  { Redirect, Route, Link } from 'react-router-dom'
import Header from '../Header';


const Login =  () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggedin, setLoggedin] = React.useState(false);
    const [aaa, setaaa] = React.useState('');

    // useEffect (() => {
    //     axios.get('/users/login').then(res=>console.log(res));
    // });

    const loginSubmit = (e) => {
        e.preventDefault();
        console.log({username});
        console.log({password});
        const user = {username: username, password: password};
        axios.post('/users/login', user)
            .then((res) => {
                setLoggedin(res.data);
                //console.log(res);
            })
    }

    
    if(loggedin) {
        return(
            <Redirect to="/dashboard" /> 
        );
    }else return(
        <div>
            <Header loggedin={false} />
            <div className="login">
                <div>Login</div>
                <div className="login__form">
                    <form onSubmit={loginSubmit} >
                        <input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
                        <input type="password"  name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
                        <button type="submit" value="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>            
    );
}

export default Login;