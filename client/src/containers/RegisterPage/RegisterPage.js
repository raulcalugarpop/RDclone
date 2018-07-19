import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class RegisterPage extends Component {
    render() {
        return(
            <Form>
                <Label><h4>Please fill the forms below</h4></Label>
                <FormGroup>
                    <Input type="text" name="username" id="username" placeholder="username" required />
                </FormGroup>

                <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="email" required />
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" required />
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" required />
                </FormGroup>

                <FormGroup>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" required />
                </FormGroup>

                <FormGroup>
                    <Input type="password" name="confirmpassword" id="confirmPassword" placeholder="Repeat password" required />
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        );
    }
}

export default RegisterPage;