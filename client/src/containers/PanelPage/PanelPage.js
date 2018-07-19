import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import API from '../../api/api';
import Auth from '../../services/auth';

import jwt_decode from 'jwt-decode';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: []
        };

        this.welcomeName = localStorage.getItem('name');
        this.token = jwt_decode(Auth.getToken());
    }

    test() {
        API.get(`/users/${this.token.id}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            }).catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.test();
    }


    render() {
        return (
            <div>
                <h3>Welcome to your control panel, {this.welcomeName}.</h3>
                <br />
                <Form onSubmit={this.handleSubmit}>
                <Label for="PersonalInfo" className="mr-sm-2">Personal information:</Label>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        
                        <Input type="text" name="firstName" placeholder={this.state.user.firstName} onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="lastName" placeholder={this.state.user.lastName} onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        
                        <Input type="email" name="email" placeholder={this.state.user.email} onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        
                        <Input type="password" name="password" placeholder="New Password" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        
                        <Input type="password" name="confirmpassword" placeholder="Confirm new password" onChange={this.handleChange} />
                    </FormGroup>

                    
                    <br />
                    <Button type="submit">Submit</Button>
                </Form>


            </div>
        );
    }
}

export default HomePage;