import React, { useEffect } from 'react';
import axios from 'axios';
import  { Redirect, Route, Link } from 'react-router-dom'
import Header from '../Header';
import SimpleReactValidator from 'simple-react-validator';
import { Button, Modal, Alert, Form } from 'react-bootstrap';


class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            submitErr: '',
            show: false,
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    onSubmit = (e) => {
        e.preventDefault();
        const user = {username: this.state.username, password: this.state.password};
        if(this.validator.allValid()){
            axios.post('/users/login', user)
                .then((res) => {
                    //console.log(res.data);
                    this.props.onLoginChange(res.data.success);
                    this.setState({submitErr: res.data.message});
                    if(res.data.success){
                        console.log(this.state.submitErr);
                        this.props.onUserChange(res.data.user);
                        this.handleClose();
                    }
                })
        } else {
            this.validator.hideMessages();
        }
    }

    setUsername = (e) => {
        this.setState({'username': e.target.value});
    }
    setPassword = (e) => {
        this.setState({'password': e.target.value});
    }

    submitErr = () => {
        if(this.state.submitErr===''){
            return null;
        } else {
            return(
                <Alert variant="warning ">{this.state.submitErr}</Alert>
            );
        }
    }

    usernameValid = () => {
        if (this.validator.fieldValid('username') || this.state.username==='') {
            // booya this field is valid!
            return null;
        } else {
            return(
                <Alert variant="danger">{this.validator.getErrorMessages().username}</Alert>
            );
        }
    }

    passwordValid = () => {
        if (this.validator.fieldValid('password') || this.state.password==='') {
            // booya this field is valid!
            return null;
        } else {
            return(
                <Alert variant="danger">{this.validator.getErrorMessages().password}</Alert>
            );
        }
    }

    render(){
        return(
            <div>
                <Button variant="light" onClick={this.handleShow}>
                    Login
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {this.submitErr()}
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="input" name="username" value={this.state.username} onChange={this.setUsername} placeholder="username" />
                                {this.validator.message('username', this.state.username, 'required|alpha_num_dash|max:15|min:5')}
                                {this.usernameValid()}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"  name="password" value={this.state.password} onChange={this.setPassword} placeholder="password" />
                                {this.validator.message('password', this.state.password, 'required|alpha_num_dash|max:15|min:5')}
                                {this.passwordValid()}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onSubmit}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        );
    }
}

export default Login;