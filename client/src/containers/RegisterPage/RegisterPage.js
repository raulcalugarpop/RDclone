import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import API from '../../api/api';
import Auth from '../../services/auth';

class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            fullName: '',
            password: ''
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const data = {
            fullName: this.state.fullName,
            email:this.state.email,
            password: this.state.password
        };
    
        API.post('/register', data)
        .then(res => {
            Auth.AuthenticateUser(res.data.token, this.state.email);
            console.log(res);
            this.props.history.push('/');
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Label><h4>Please fill the forms below</h4></Label>
                {/* <FormGroup>
                    <Input type="text" name="username" id="username" placeholder="username" required />
                </FormGroup> */}

                <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="email" required onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="fullName" id="fullName" placeholder="Full Name" required onChange={this.handleChange}/>
                </FormGroup>
                
                {/* <FormGroup>
                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" required />
                </FormGroup> */}

                {/* <FormGroup>
                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" required />
                </FormGroup> */}

                <FormGroup>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" required onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Input type="password" name="confirmpassword" id="confirmPassword" placeholder="Repeat password" required onChange={this.handleChange}/>
                </FormGroup>

                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

export default RegisterPage;