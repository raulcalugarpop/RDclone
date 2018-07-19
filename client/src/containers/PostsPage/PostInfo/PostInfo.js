import React, { Component } from 'react';
import { Button } from 'reactstrap';

import API from '../../../api/api';

class PostInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: null
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const that = this;

        API.get(`/posts/${params.id}`)
            .then(res => {
                setTimeout(() => {
                    that.setState({
                        post: res.data
                    });
                }, 500)
            }).catch(err => {
                console.log(err)
            });
    }

    render() {
        if (!this.state.post) {
            return (<p>Loading...</p>);
        }

        return (
            <div>
                <h1>Post: <Button onClick={() => this.props.history.push("/posts")}>Back</Button></h1>
                <p>
                    On {this.state.post.createdAt}, {this.state.post.author} wrote:
                                        <br />
                    {this.state.post.text}
                </p>
            </div>
        );
    }
}

export default PostInfo;