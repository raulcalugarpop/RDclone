import React, { Component } from 'react';
import { Table } from 'reactstrap';

import API from '../../api/api';

class UsersPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.test = this.test.bind(this);
    }


    test() {
        API.get('/users')
            .then(res => {
                this.setState({
                    users: res.data
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
                    <h2>Users:</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, idx) => {
                                return (
                                        <tr key={idx}>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
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

export default UsersPage;