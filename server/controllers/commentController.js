const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const commentController = {};


// FIND ALL COMMENTS
commentController.findAll = (req, res) => {
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
commentController.create = (req, res) => {

    const { text } = req.body;

    const comment = new db.Comment({
        text,
        _creator: req.user._id,
        postId: req.Post._id
    });

    comment.save().then( (comment) => {
                return res.status(200).json({
                success: true,
                data: comment
        })
        
        
    }).catch( (err) => {
        return res.status(500).json({
            message: err
        });
    });
};


// FIND ONE COMMENT
commentController.findOne = (req, res, next) => {

    db.Comments.findOne({ _id: req.params.id }).exec() ///////////////////////// todo
    .then( (foundComment) => {
        res.return(200).json({
            message: foundComment
        })
    });
};


// EDIT COMMENT
commentController.update = (req, res, next) => {

    db.Comments.findOneAndUpdate({ _id: req.params.id }, { text: req.body.text }).exec().then( (text) => {
        res.status(200).json({
            message: text
        }).catch( (err) => {
            return res.status(500).json({
                message: err
            });
        });
    })
};


// DELETE COMMENT
commentController.delete = (req, res, next) => {
    
    db.Comments.findOneAndUpdate( { _id: req.params.id }, { isDeleted: true }).exec()
    .then( () => {
        return res.status(200).json({
            success: true,
            message: 'comment deleted'
        });
    });
};


module.exports = commentController;