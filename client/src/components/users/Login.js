import React, { useEffect } from 'react';
import axios from 'axios';
import  { Redirect, Route, Link } from 'react-router-dom'
import Header from '../Header';
import SimpleReactValidator from 'simple-react-validator';



class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errormsg: '',
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    loginSubmit = (e) => {
        e.preventDefault();
        const user = {username: this.state.username, password: this.state.password};
        if(this.validator.allValid()){
            //console.log('all done');
            axios.post('/users/login', user)
                .then((res) => {
                    //console.log(res.data);
                    this.props.onLoginChange(res.data.success);
                    this.setState({errormsg: 'res.data.message'});
                })
        } else {
            this.validator.showMessages();
            //this.forceUpdate();
        }
        
    }

    setUsername = (e) => {
        this.setState({'username': e.target.value});
    }
    setPassword = (e) => {
        this.setState({'password': e.target.value});
    }

    render(){
        if(this.props.login) {
            return(
                <Redirect to="/dashboard" /> 
            );
        }else return(
            <div>
                <Header login={this.props.login} />
                <div className="login">
                    <div>Login</div>
                    <div>{this.errormsg}</div>
                    <div className="login__form">
                        <form onSubmit={this.loginSubmit} >
                            <input type="text" name="username" value={this.state.username} onChange={this.setUsername} placeholder="username" />
                            {this.validator.message('username', this.state.username, 'required|alpha_num_dash|max:15|min:5')}
                            <input type="password"  name="password" value={this.state.password} onChange={this.setPassword} placeholder="password" />
                            {this.validator.message('password', this.state.password, 'required|alpha_num_dash|max:15|min:5')}
                            <button type="submit" value="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>            
        );
    }
}

export default Login;