import React, { Component } from 'react';
import {
    Button
} from 'reactstrap';
import '../App.css';

class RegisterComponent extends Component {
    render() {
        return(
            <div className="RegisterComponent">
                    <h1>Register-Page</h1>
                    <form action="/register" method="POST">
                        <input placeholder="username"/><br/>
                        <input placeholder="email"/>
                        <input placeholder="First Name"/>
                        <input placeholder="Last Name"/>
                        <input placeholder="Password"/>
                        <input placeholder="Again"/>
                        <Button type="submit" color="primary">Register</Button>
                    </form>
            </div>
        );
    }
}

export default RegisterComponent;