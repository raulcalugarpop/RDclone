const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://admin:parola1@ds131711.mlab.com:31711/internshipdb', () => {
    console.log("Connected to MongoDB");
});

/// Middleware
app.use(bodyParser.json());

app.use('/api', routes);

module.exports = app;