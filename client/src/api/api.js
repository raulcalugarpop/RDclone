import axios from 'axios';

import Auth from '../services/auth';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

instance.interceptors.request.use(function (config) {
    const token = Auth.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    if (err.response.status === 401) {
        Auth.deauthenticateUser();
        window.location.href = "/login";
    }
});

export default instance;