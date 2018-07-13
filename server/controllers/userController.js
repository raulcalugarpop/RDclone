const config = require('../config/config');
const db = require('../models');

const userController = {};


userController.findAll = (req, res) => {

    db.User.find( { $or: [ { isDeleted: false } ] } )
    .exec()
    .then( (users) => {
        const userList = {};
        users.forEach( (user) => {
            userList[user._id] = req.user.username;
        });
        return res.status(200).json({
            message: userList
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.message
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
        return res.status(200).json({
            success: true,
            data: newUser
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });
};

userController.findOne = (req, res) => {
    db.User.findOne( { _id: req.params.id })
    .exec()
    .then( (user) => {
        return res.status(200).json({
            message: user
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });
};

userController.update = (req, res) => {
    // res.status(200).json({ message: 'update user still to do...' });
    // var req = {test1:1234,test2:undefined,test3:3456};
    // var update= {};
    // if(req.test1){update.test1=req.test1}
    db.User.findOneAndUpdate( { _id: req.params.id }, { firstName: req.body.firstName })
    .exec()
    .then( (updatedUser) => {
        return res.status(200).json({
            success: true,
            message: updatedUser
        });
    })
    .catch( (err) => {
        return res.status(500).json({
            message: 'user not found',
            message: err
        });
    });
};

userController.delete = (req, res) => {
    db.User.findOneAndUpdate( { _id: req.params.id }, { isDeleted: true })
    .exec()
    .then( () => {
        return res.status(200).json({
            message: 'user marked as deleted'
        });
    })
    .catch((err) => {
        return res.status(500).json({
            message: 'user not found',
            message: err
        });
    });
};

module.exports = userController;