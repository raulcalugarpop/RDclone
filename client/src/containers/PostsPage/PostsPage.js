import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

import API from '../../api/api';

class PostsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        const that = this;

        API.get('/posts')
            .then(res => {
                setTimeout(() => {
                    that.setState({
                        posts: res.data
                    });
                }, 500)
            }).catch(err => {
                console.log(err)
            });
    }

    render() {
        if (!this.state.posts.length) {
            return  (<p>Loading...</p>);
        }

        return (
            <div>
                <h1>Posts: <Button onClick={() => this.props.history.push("/posts/new")}>New post</Button></h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post, idx) => {
                            return (
                                <tr key={idx} onClick={() => this.props.history.push(`/posts/${post._id}`)}>
                                
                                    <td>{post.title}</td>
                                    <td>{post._id}</td>
                                    <td>{post.createdAt}</td>
                                    
                                </tr>
                            );
                        })
                        }

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default PostsPage;