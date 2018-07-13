const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');
const EmailSenderComponent = require('../components/emailSenderComponent');
const emailSenderComponent = new EmailSenderComponent();

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

    db.User.findOne( { email: res.body.email }).exec().then( (foundEmail) => {
        if(foundEmail) {
            let token = jwt.sign( { id: user.email }, config.jwt.secret, { expiresIn: '1h'} );
            emailSenderComponent.sendResetPromise( { token: token, user: user })
                .then((info)=>{
                    res.status(200).json({
                        message: 'success'
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                });
        } else {
            console.log('email not found');
            res.status(401).json({
                message: 'email does not exist'
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });
};
// db.User.findOne( { email: res.body.email }).exec((error,foundEmail)=>{
//     if(error){
//         return res.status(500).json({
//             message: error.message
//         });
//     }
//     if(foundEmail) {
//         let token = jwt.sign( { id: user.email }, config.jwt.secret, { expiresIn: '1h'} );
//         emailSenderComponent.sendReset( { token: token, user: user }, (error) => {
//             if (error){
//                 return res.status(500).json({
//                     message: error.message
//                 })
//             }
//             res.status(200).json({
//                 message: 'success'
//             });
//         });
//     } else {
//         console.log('email not found');
//         res.status(401).json({
//             message: 'email does not exist'
//         });
//     }
// })

// CLICK TO RESET PASSWORD
authController.resetPassword = (req, res) => {

    jwt.verify(req.params.token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                message: 'token invalid or expired'
            });
        } else if (decoded) {
            let newPassword = req.body.password;
            let confirmPassword = req.body.confirmPassword;

            if (newPassword === confirmPassword) {
                user.password = newPassword;
                user.save().then( () => {
                    console.log('password change success');

                    emailSenderComponent.resetConfirm({user: user},(err)=>{
                        if(err){
                            return res.status(500).json({
                                message: err.message
                            });
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'password updated'
                        });
                    });
                })
            } else {
                return res.status(500).json({
                message: 'passwords does not match'
            });

            }
        } else {
            return res.status(500).json({
                message: 'token invalid or expired'
            });
        }
    });
};

module.exports = authController;