import React from 'react';
import axios from 'axios';
import  { Redirect, Route } from 'react-router-dom'


const Login =  () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggedin, setLoggedin] = React.useState(false);

    const loginSubmit = (e) => {
        e.preventDefault();
        console.log({username});
        console.log({password});
        axios.get('/login')
            .then((res) => setLoggedin(res.data))
            .then(()=> {
                if(loggedin){
                    <Redirect to="/dashboard" />
                }
            })
    }

    const LoginPage = () => {
        return(
            <div className="login">
                {loggedin? <div>yeah</div>:<div>nope</div>}
                <div className="login__form">
                    <form onSubmit={loginSubmit} >
                        <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
                        <button type="submit" value="submit">Enter</button>
                    </form>
                </div>
            </div>
        );
    }

    return(
        <Route path="/">
            {loggedin ? <Redirect to="/dashboard/todolist" />:<LoginPage />}
        </Route>        
    );
}

export default Login;