import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container } from 'reactstrap';


import NavBar from './components/NavBar';
//import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';

class App extends Component {
  render() {
    return (
      <div className="Container">
        <Container>
          <NavBar />
          
          <LoginComponent />
        </Container>
      </div>
    );
  }
}

export default App;