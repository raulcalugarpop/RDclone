const db = require('../models');
const bcrypt = require('bcrypt');

const userController = {};


/// SIGN UP / REGISTER

userController.register = (req, res) => {

    db.User.find( { $or: [{email: req.body.email }, { username: req.body.username }] })
    .exec()
    .then( (user) => {
        if (user.length >= 1) {
            console.log('register failed. email or username already taken');
            res.status(400).json({
                message: "email or username already taken"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const { username, email, firstName, lastName } = req.body;
                if (err) {
                    console.log('fail');
                    res.status(500).json({
                        message: 'err'
                    });
                } else {
                    const user = new db.User({
                        //_id,
                        username,
                        password: hash,
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
                    });
        
                }
            });
        };
    });
};


/// LOGIN / SIGN IN
/*
userController.login = async (req, res) => {
    try {
        const user = await db.User.findOne( { $or: [{email: req.body.email }, { username: req.body.username }] }).exec();
        if (!user) {
            return res.status(401).json({
                message: "invalid username or email"
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            console.log('password correct');
            res.status(200).json({
                message: 'login success'
            });
        } else {
            console.log('password fail');
            res.status(401).json({
                message: 'incorrect password'
            });
        };

    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }

    */
userController.login = (req, res) => {
    db.User.findOne( { $or: [{email: req.body.email }, { username: req.body.username }] })
    .exec()
    .then( (user) => {
        if (!user) {
            res.status(401).json({
                message: "invalid username or email"
            });
        } else {
            console.log('user found, checking password');

            bcrypt.compare(req.body.password, user.password, (err, result) => {
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
                    res.status(200).json({
                        message: 'login success'
                    });
                };
            });
        }
    });
};

module.exports = userController;