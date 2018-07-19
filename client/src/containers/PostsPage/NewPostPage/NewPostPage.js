import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import API from '../../../api/api';
import Auth from '../../../services/auth';

class NewPostPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            author: '',
            text: ''
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const data = {
            title: this.state.title,
            author: localStorage.getItem('name'),
            text: this.state.text
        };
    
        API.post('/posts', data)
        .then(res => {
            Auth.AuthenticateUser(res.data.token);
            this.props.history.push('/posts');
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.props.history.push("/posts")}>Back</Button>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Title</Label>
                    <Input type="text" name="title" id="name" placeholder="Title" onChange={this.handleChange}  required />
                </FormGroup>
                <br/>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleMessage" className="mr-sm-2">Message</Label>
                    <Input type="textarea" name="message" id="message" placeholder="Message" onChange={this.handleChange} required />
                </FormGroup>
                <br/>
                <Button type="submit">Submit</Button>
            </Form>
            </div>
        );
    }
}

export default NewPostPage;