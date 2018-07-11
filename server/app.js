const dotenv = require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const config = require('./config/config');
const routes = require('./routes');

const port = process.env.PORT || 3000;

mongoose.connect(config.database, () => {
    console.log("Connected to MongoDB");
});

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${config.database}`);
});

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ', err);
});

const app = express();

/// Middleware
app.use(bearerToken());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.use((err, req, res, next) => {
	res.status(500).json({
        message: err || 'Internal Server error'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});