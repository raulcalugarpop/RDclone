const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const userController = {};


userController.findAll = (req, res) => {
    //res.status(200).json({ message: 'find all users still to do...' });

    db.User.find( { $or: [ { isDeleted: false }, { isDeleted: { $exists: false } } ] } ).exec().then( (users) => {
        const userList = {};
        users.forEach( () => {
            userList[users._id] = user.username;
        });
        res.status(200).json({
            message: userList
        });
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};

userController.create = (req, res, next) => {

    const {
        username,
        email,
        password,
        firstName,
        lastName } = req.body;
    
    const user = new db.User({
        username,
        email,
        password,
        firstName,
        lastName
    });

    user.save().then( (newUser) => {
        res.status(200).json({
            success: true,
            data: newUser
        });
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};

userController.findOne = (req, res) => {
    db.User.findOne( { result: req.params.userId }).exec().then( (result) => {
        res.status(200).json({
            message: result.firstName
        });
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};

userController.update = (req, res, next) => {
    // res.status(200).json({ message: 'update user still to do...' });
    // var req = {test1:1234,test2:undefined,test3:3456};
    // var update= {};
    // if(req.test1){update.test1=req.test1}
    db.User.findOneAndUpdate( { result: req.params.userId }, { firstName: req.body.firstName }).exec() ////////////////////// ???????
    .then( (updatedUserInfo) => {
        res.status(200).json({
            success: true,
            message: updatedUserInfo
        });
    })
    .catch( (err) => {
        console.log('nu merge');
        return res.status(500).json({
            message: err
        });
    });
};

userController.delete = (req, res) => {

    db.User.deleteOne({ _id: req.params.userId })
    .exec()
    .then( () => {
        res.status(200).json({
            message: 'deleted user'
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};

module.exports = userController;