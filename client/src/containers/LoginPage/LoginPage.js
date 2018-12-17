import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import API from '../../api/api';
import Auth from '../../services/auth';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    


    handleSubmit = event => {
        event.preventDefault();
    
        const data = {
            email: this.state.email,
            password: this.state.password
        };
    
        API.post('/login', data)
        .then(res => {
            Auth.AuthenticateUser(res.data.token, this.state.email);
            this.props.history.push('/');
        }).catch(err => {
            console.log(err)
        });
    }


    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="text" name="email" id="login" placeholder="e-mail" onChange={this.handleChange} />
                </FormGroup>
                <br/>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={this.handleChange} />
                </FormGroup>
                <br/>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

export default LoginPage;