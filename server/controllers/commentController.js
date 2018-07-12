const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const commentController = {};

// FIND ALL COMMENTS
commentController.findAll = (req, res, next) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id' ////////////////////////////// ???????????????????
    }).then( (comments) => {
        return res.status(200).json({
            success: true,
            data: comments
        });
        }).catch( (err) => {
        return res.render(500).json({
            message: err
        });
    });
};

// NEW COMMENT
commentController.create = (req, res, next) => {
    const {
        text,
        userId,
        postId
    } = req.body;

    const comment = new db.Comment({
        text,
        _creator: userId,
        post: postId
    });

    post.save().then( (newComment) => {
        db.Post.findByIdAndUpdate(
            postId,
            { $push: {'_comments': _newComment.id } }
        ).then( (existingPost) => {
            return res.status(200).json({
                success: true,
                data: existingPost
            });
        }).catch( (err) => {
            return res.status(500).json({
                message: err
            });
        });
    });
};

// FIND COMMENT
commentController.findOne = (req, res, next) => {
    res.status(200).json({ message: 'find one comment still to do...' });
};

// UPDATE COMMENT
commentController.update = (req, res, next) => {
    res.status(200).json({ message: 'update comment still to do...' });
};

// DELETE COMMENT
commentController.delete = (req, res, next) => {
    res.status(200).json({ message: 'delete comment still to do...' });
};


/*
commentController.post = (req, res) => {
    const {
        text,
        userId,
        postId
    } = req.body;

    const comment = new db.Comment({
        text,
        _creator: userId,
        post: postId
    });

    post.save().then( (newComment) => {
        db.Post.findByIdAndUpdate(
            postId,
            { $push: {'_comments': _newComment.id } }
        ).then( (existingPost) => {
            return res.status(200).json({
                success: true,
                data: existingPost
            });
        }).catch( (err) => {
            return res.status(500).json({
                message: err
            });
        });
    });
}; */


/*
commentController.GetAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id' ////////////////////////////// ???????????????????
    }).then( (comments) => {
        return res.status(200).json({
            success: true,
            data: comments
        });
        }).catch( (err) => {
        return res.render(500).json({
            message: err
        });
    });
};
*/

module.exports = commentController;