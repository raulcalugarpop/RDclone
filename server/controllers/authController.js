const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const authController = {};

/// REGISTER
authController.register = (req, res) => {
    db.User.find( { $or: [{email: req.body.email }, { username: req.body.username }] })
    .exec()
    .then( (user) => {
        if (user.length >= 1) {
            console.log('register failed. email or username already taken');
            res.status(400).json({
                message: "email or username already taken"
            });
        } else {
                const { username, email, password, firstName, lastName } = req.body;

                const user = new db.User({
                    username,
                    password,
                    email,
                    firstName,
                    lastName
                });
    
                user
                .save()
                .then( (newUser) => {
                    console.log('user saved');
                    res.status(200).json({
                        success: true,
                        data: newUser
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                });
            }
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message
        });
    })
};


/// LOGIN
authController.login = (req, res) => {
    db.User.findOne( { $or: [{email: req.body.email }, { username: req.body.username }] })
    .exec()
    .then( (user) => {
        if (!user) {
            res.status(401).json({
                message: "invalid username or email"
            });
        } else {
            console.log('user found, checking password');

            db.User.comparePassword(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: err
                    });
                }
                else if (!result) {
                    console.log('password fail');
                    res.status(401).json({
                        message: 'incorrect password'
                    });
                }
                else if (result){
                    console.log('password correct');

                    const returnedToken = jwt.sign( { id: user._id }, config.jwt.secret, { expiresIn: '1h'} );

                    res.status(200).json({
                        message: 'login success',
                        token: returnedToken
                    });
                };
            });
        }
    });
};


// FORGOT PASSWORD
authController.sendPasswordReset = (req, res, next) => {
    res.status(200).json({ message: 'send password reset still to do...' });
};

// CLICK TO RESET PASSWORD
authController.resetPassword = (req, res, next) => {
    res.status(200).json({ message: 'reset password still to do...' });
};

module.exports = authController;