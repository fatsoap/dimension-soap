import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../Header';

const Register =  () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [animal, setAnimal] = React.useState('');

    const [errormsg, setErrormsg] = React.useState('');
    const [registered, setRegistered] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            email: email,
            password: password,
            password2: password2,
            animal: animal
        };
        axios.post('/users/register', user)
            .then((res)=>{
                if(res.data.registered){
                    setRegistered(true);
                } else {
                    setErrormsg(res.data.errmsg);
                }
            })
    }
    if(registered){
        return(
            <div>
                <div>Register Success, you can login now</div>
                <Link to="/users/login" >Login</Link>
            </div>
            
        )
    }else {
        return(
            <div>
                <Header loggedin={false}/>
                <div>Register page here</div>
                {errormsg===''? <div></div>: <div>{errormsg}</div>}
                <form onSubmit={onSubmit} >
                    <input type="text" value={username} name="username" placeholder="username" onChange={(e)=>setUsername(e.target.value) } />
                    <input type="text" value={email} name="email" placeholder="email" onChange={(e)=>setEmail(e.target.value) } />
                    <input type="password" value={password} name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value) } />
                    <input type="password" value={password2} name="password2" placeholder="confirm password" onChange={(e)=>setPassword2(e.target.value) } />
                    <input type="text" value={animal} name={animal} placeholder="animal" onChange={(e)=>setAnimal(e.target.value) } />
                    <button type="submit" value="submit">Enter</button>
                </form>
            </div>
        );
    }
}

export default Register;