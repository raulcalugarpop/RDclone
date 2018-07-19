import React, { Component } from 'react';
import {
    Button
} from 'reactstrap';
import '../App.css';

class NewPost extends Component {
    render() {
        return(
            <div className="LoginComponent">
                    <h1>New post</h1>
                    <form action="/posts" method="POST">
                        <input placeholder="Title"/><br/>
                        <textarea name="message" placeholder="Text..." rows="10" cols="30"></textarea><br/>
                        <Button type="submit" color="primary">Submit</Button>
                    </form>
            </div>
        );
    }
}

export default NewPost;