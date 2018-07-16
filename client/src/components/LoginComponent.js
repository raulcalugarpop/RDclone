import React, { Component } from 'react';
import {
    Button
} from 'reactstrap';
import '../App.css';

class LoginComponent extends Component {
    render() {
        return(
            <div className="LoginComponent">
                    <h1>Login Page</h1>
                    <form action="/login" method="POST">
                        <input placeholder="username or email"/><br/>
                        <input placeholder="Password"/><br/>
                        <Button type="submit" color="primary">Login</Button>
                    </form>
            </div>
        );
    }
}

export default LoginComponent;