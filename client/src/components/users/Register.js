import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../Header';
import SimpleReactValidator from 'simple-react-validator';
import { Button, Modal, Alert, Form } from 'react-bootstrap';

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
            submitErr: '',
            registered: false,

            show: false,
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

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

            axios.post('/users/register', user)
                .then((res)=>{
                    this.setState({'registered':res.data.success});
                    this.setState({'submitErr':res.data.message});
                    if(res.data.success){
                        this.handleClose();
                    }
                });    
        } else {
            this.validator.hideMessages();
        }        
    }

    submitErr = () => {
        if(this.state.submitErr===''){
            return null;
        } else {
            return(
                <Alert variant="warning" className="mt-2" >{this.state.submitErr}</Alert>
            );
        }
    }

    usernameValid = () => {
        if (this.validator.fieldValid('username') || this.state.username==='') {
            return null;
        } else {
            return(
                <Alert variant="danger" className="mt-2" >{this.validator.getErrorMessages().username}</Alert>
            );
        }
    }

    emailValid = () => {
        if (this.validator.fieldValid('email') || this.state.email==='') {
            return null;
        } else {
            return(
                <Alert variant="danger" className="mt-2" >{this.validator.getErrorMessages().email}</Alert>
            );
        }
    }

    passwordValid = () => {
        if (this.validator.fieldValid('password') || this.state.password==='') {
            return null;
        } else {
            return(
                <Alert variant="danger" className="mt-2" >{this.validator.getErrorMessages().password}</Alert>
            );
        }
    }

    password2Valid = () => {
        if (this.validator.fieldValid('confirm password') || this.state.password2==='') {
            if(this.state.password2 === this.state.password) return null;
            else return <Alert variant="danger">Confirm password different</Alert>
        } else {
            return(
                <Alert variant="danger" className="mt-2" >{this.validator.getErrorMessages()['confirm password']}</Alert>
            );
        }
    }

    animalValid = () => {
        if (this.validator.fieldValid('animal') || this.state.animal==='') {
            return null;
        } else {
            return(
                <Alert variant="danger" className="mt-2" >{this.validator.getErrorMessages().animal}</Alert>
            );
        }
    }

    render(){
        return(
            <div>   
                <Button variant="light" onClick={this.handleShow}>
                    Register
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {this.submitErr()}
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={this.state.username} placeholder="username" onChange={(e)=>this.setState({'username': e.target.value}) } />
                                {this.validator.message('username', this.state.username, 'required|alpha_num_dash|max:15|min:5')}
                                {this.usernameValid()}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={this.state.email} placeholder="email" onChange={(e)=>this.setState({'email': e.target.value}) } />
                                {this.validator.message('email', this.state.email, 'required|email')}
                                {this.emailValid()}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={this.state.password} placeholder="password" onChange={(e)=>this.setState({'password': e.target.value}) } />
                                {this.validator.message('password', this.state.password, 'required|alpha_num_dash|max:15|min:5')}
                                {this.passwordValid()}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" value={this.state.password2} placeholder="confirm password" onChange={(e)=>this.setState({'password2': e.target.value}) } />
                                {this.validator.message('confirm password', this.state.password2, 'required|alpha_num_dash|max:15|min:5')}
                                {this.password2Valid()}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Animal</Form.Label>
                                <Form.Control type="text" value={this.state.animal}  placeholder="animal" onChange={(e)=>this.setState({'animal': e.target.value}) } />
                                {this.validator.message('animal', this.state.animal, 'required|alpha_num_dash|max:10')}
                                {this.animalValid()}
                            </Form.Group>
                        </Form>                                             
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onSubmit}>
                            Register
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
     }
}

export default Register;