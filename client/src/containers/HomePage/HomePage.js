import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Auth from '../../services/auth';
//import Graph from '../GraphPage/Graph';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: []
        };

        this.welcomeName = localStorage.getItem('name');
    }

    render() {
        if (Auth.isUserAuthenticated()) {
            return (
                <div>
                    <h1>Welcome, {this.welcomeName}</h1>
                    <Container>
                        <p>News container.</p>
                        {/* <Graph /> */}
                    </Container>
                </div>
            );
        }

        return (
            <div>
                <h1>Welcome</h1>
            </div>
        );
    }
}

export default HomePage;