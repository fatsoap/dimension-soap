import React, { useEffect } from 'react';
import axios from 'axios';
import  { Redirect, Route } from 'react-router-dom'


const Login =  () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggedin, setLoggedin] = React.useState(false);
    const [aaa, setaaa] = React.useState('');

    // useEffect (() => {
    //     axios.get('/users/login').then(res=>console.log(res));
    // });

    const loginSubmit = (e) => {
        //e.preventDefault();
        console.log({username});
        console.log({password});
        const user = {username: username, password: password};
        axios.post('/users/login', user)
            .then((res) => {
                //setLoggedin(res.data);
                console.log(res);
            })
            .then(()=> {
                if(loggedin){
                    <Redirect to="/dashboard" />
                }
            })
    }

    // const LoginPage = () => {
    //     return(
    //         <div className="login">
    //             <input key="some" type="text" value={aaa} onChange={e=>setaaa(e.target.value)} placeholder="daa" />
    //             {loggedin? <div>yeah</div>:<div>nope</div>}
    //             <div className="login__form">
    //                 <form onSubmit={loginSubmit} >
    //                     <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
    //                     <input type="password"  value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
    //                     <button type="submit" value="submit">Enter</button>
    //                 </form>
    //             </div>
    //         </div>
    //     );
    // }
    if(loggedin) {
        return(
            <Route path="/">
                <Redirect to="/dashboard/todolist" />
            </Route>   
        );
    }else return(
        <div className="login">
            <input key="some" type="text" value={aaa} onChange={e=>setaaa(e.target.value)} placeholder="daa" />
            {loggedin? <div>yeah</div>:<div>nope</div>}
            <div className="login__form">
                <form onSubmit={loginSubmit} >
                    <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
                    <input type="password"  value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
                    <button type="submit" value="submit">Enter</button>
                </form>
            </div>
        </div>            
    );
}

export default Login;