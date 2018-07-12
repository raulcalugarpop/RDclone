const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const postController = {};

postController.findAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id' ////////////////////////////// ???????????????????
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator'
    })
    .then( (posts) => {
        return res.status(200).json({
            success: true,
            data: posts
        });
        }).catch( (err) => {
        return res.render(500).json({
            message: err
        });
    });
};

postController.create = (req, res) => {
    const {
        title,
        text,
        link,
        userId
    } = req.body;

    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId
    });

    post.save().then( (newPost) => {
        res.status(200).json({
            success: true,
            data: newPost
        });
    }).catch( (err) => {
        return res.status(500).json({
            message: err
        });
    });
};

postController.findOne = (req, res, next) => {
    res.status(200).json({ message: 'find one post still to do...' });
};

postController.update = (req, res, next) => {
    res.status(200).json({ message: 'update post still to do...' });
};

postController.delete = (req, res, next) => {
    res.status(200).json({ message: 'delete post still to do...' });
};

postController.vote = (req, res, next) => {
    res.status(200).json({ message: 'vote post still to do...' });
};



/*
postController.post = (req, res) => {
    const {
        title,
        text,
        link,
        userId
    } = req.body;

    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId
    });

    post.save().then( (newPost) => {
        res.status(200).json({
            success: true,
            data: newPost
        });
    }).catch( (err) => {
        return res.status(500).json({
            message: err
        });
    });
};

postController.GetAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id' ////////////////////////////// ???????????????????
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator'
    })
    .then( (posts) => {
        return res.status(200).json({
            success: true,
            data: posts
        });
        }).catch( (err) => {
        return res.render(500).json({
            message: err
        });
    });
};
*/

module.exports = postController;