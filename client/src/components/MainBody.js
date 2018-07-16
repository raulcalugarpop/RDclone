import React, { Component } from 'react';
import '../App.css';

class MainBody extends Component {
    state = { users: [] };

    componentDidMount() {
        fetch('/users')
        .exec()
        .then( () => { console.log('did mount'); })
        .then(res => res.json())
        .then(users => this.setState({ users }));
    }
    render(){
        return(
            <div className="MainBody">
                <h3>Content</h3>
                <ul>
                    <li>{this.state.users.username}</li>
                </ul>
            </div>
        );
    }
};

export default MainBody;