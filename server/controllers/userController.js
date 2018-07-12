const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const userController = {};


userController.findAll = (req, res, next) => {
    res.status(200).json({ message: 'find all users still to do...' });
};

userController.create = (req, res, next) => {
    res.status(200).json({ message: 'create user still to do...' });
};

userController.findOne = (req, res, next) => {
    res.status(200).json({ message: 'find one user still to do...' });
};

userController.update = (req, res, next) => {
    res.status(200).json({ message: 'update user still to do...' });
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