import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import Auth from '../../services/auth';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    Auth.deauthenticateUser();
    this.props.history.push('/');
  }

  render() {
    if (Auth.isUserAuthenticated()) {
      return (
        <Navbar color="dark" dark expand="md">
          <NavbarBrand onClick={() => this.props.history.push("/")}>RD Clone</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Button onClick={() => this.props.history.push("/panel")}>Control Panel</Button>
              </NavItem>
              <NavItem>
              <Button onClick={() => this.props.history.push("/users")}>Users</Button>
              </NavItem>
              <NavItem>
                <Button onClick={() => this.props.history.push("/posts")}>Posts</Button>
              </NavItem>
              <NavItem>
                <Button onClick={this.logout}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      );
    }

    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">RD Clone</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);