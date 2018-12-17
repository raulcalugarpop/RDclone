class Auth extends Comment {
    
    static AuthenticateUser(token, name) {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        //localStorage.setItem('name', email);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        //localStorage.removeItem('email');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;