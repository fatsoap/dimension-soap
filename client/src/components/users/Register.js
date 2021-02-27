import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../Header';
import SimpleReactValidator from 'simple-react-validator';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            animal: '',
            profileimage: 'default_pic.png',
            errormsg: '',
            registered: false,
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            animal: this.state.animal,
            profileimage: this.state.profileimage,
        };
        if(this.validator.allValid()){
            //console.log('all done');
            axios.post('/users/register', user)
                .then((res)=>{
                    this.setState({'registered':res.data.registered});
                    this.setState({'errormsg':res.data.errmessage});
                });    
        } else {
            this.validator.showMessages();
        }        
    }

    render(){
        if(this.state.registered){
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
                    <div>{this.state.errormsg}</div>
                    <form onSubmit={this.onSubmit} >
                        <input type="text" value={this.state.username} placeholder="username" onChange={(e)=>this.setState({'username': e.target.value}) } />
                        {this.validator.message('username', this.state.username, 'required|alpha_num_dash|max:15|min:5')}
                        <input type="text" value={this.state.email} placeholder="email" onChange={(e)=>this.setState({'email': e.target.value}) } />
                        {this.validator.message('email', this.state.email, 'required|email')}
                        <input type="password" value={this.state.password} placeholder="password" onChange={(e)=>this.setState({'password': e.target.value}) } />
                        {this.validator.message('password', this.state.password, 'required|alpha_num_dash|max:15|min:5')}
                        <input type="password" value={this.state.password2} placeholder="confirm password" onChange={(e)=>this.setState({'password2': e.target.value}) } />
                        {this.validator.message('confirm password', this.state.password2, 'required|alpha_num_dash|max:15|min:5')}
                        <input type="text" value={this.state.animal}  placeholder="animal" onChange={(e)=>this.setState({'animal': e.target.value}) } />
                        {this.validator.message('animal', this.state.animal, 'required|alpha_num_dash|max:10')}
                        <button type="submit" value="submit">Enter</button>
                    </form>
                </div>
            );
        }
    }
}

export default Register;