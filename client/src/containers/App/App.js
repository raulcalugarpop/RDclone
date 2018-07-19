import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from 'reactstrap';

import Auth from '../../services/auth';
import Header from '../../components/Header/Header';
import LoginPage from '../LoginPage/LoginPage';
import UsersPage from '../UsersPage/UsersPage';
import PostsPage from '../PostsPage/PostsPage';
import NewPostPage from '../PostsPage/NewPostPage/NewPostPage';
import PostInfo from '../PostsPage/PostInfo/PostInfo';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import PanelPage from '../PanelPage/PanelPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !Auth.isUserAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => Auth.isUserAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
};

const GenericNotFound = ({ location }) => (
  <div>
    <h4>
      Not found <code>{location.pathname}</code>
    </h4>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="DomContainer">
          <Container>
            <Header />
            <Container className="MainContainer">
              <Switch>
                <Route path={'/'} exact component={HomePage} />
                <AuthRoute path='/login' component={LoginPage} />
                <AuthRoute path='/register' component={RegisterPage} />
                <PrivateRoute path='/posts' exact component={PostsPage} />
                <PrivateRoute path='/posts/:id' component={PostInfo} />
                <PrivateRoute path='/posts/new' component={NewPostPage} />
                <PrivateRoute path='/users' component={UsersPage} />
                <PrivateRoute path='/users/:id' component={UsersPage} />
                <PrivateRoute path='/panel' component={PanelPage} />
                <Route component={GenericNotFound} />
              </Switch>
            </Container>
          </Container>
        </div>

      </Router>
    );
  }
}

export default App;