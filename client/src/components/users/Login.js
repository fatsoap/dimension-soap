import React, { useEffect } from 'react';
import axios from 'axios';
import  { Redirect, Route, Link } from 'react-router-dom'
import Header from '../Header';
import SimpleReactValidator from 'simple-react-validator';



const Login =  () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggedin, setLoggedin] = React.useState(false);
    const [errormsg, setErrormsg] = React.useState('');

    const Validator = new SimpleReactValidator();
    const [valiError, setValiError] = React.useState(false);



    const loginSubmit = (e) => {
        e.preventDefault();
        const user = {username: username, password: password};
        if(Validator.allValid()){
            console.log('all done');
            setValiError(false);
        } else {
            Validator.showMessages();
      
        }
        // axios.post('/users/login', user)
        //     .then((res) => {
        //         //console.log(res.data);
        //         setLoggedin(res.data.success);
        //         setErrormsg(res.data.message);
        //     })
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
                <div>{errormsg}</div>
                <div className="login__form">
                    <form onSubmit={loginSubmit} >
                        <input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
                        {valiError? <div>www</div>: <div></div>}
                        {Validator.message('username', username, 'required|email')}
                        <input type="password"  name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
                        <button type="submit" value="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>            
    );
}

export default Login;