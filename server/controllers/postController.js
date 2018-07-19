const config = require('../config/config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const postController = {};



// SHOW ALL POSTS
postController.findAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id' ////////////////////////////// ???????????????????
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator'
    })
    .then( (posts) => {
        return res.status(200).json(posts);
        }).catch( (err) => {
        return res.render(500).json({
            message: err
        });
    });
};


// SUBMIT NEW POST
postController.create = (req, res) => {
    const {
        title,
        text,
        link,
        userId,
        amount,
        voters = []
    } = req.body;

    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId,
        amount,
        voters
    });

    post.save()
    .then( (newPost) => {
        return res.status(200).json({
            success: true,
            data: newPost
        });
    }).catch( (err) => {
        return res.status(500).json({
            message: err.message
        });
    });
};


// RETURN A SPECIFIC POST
postController.findOne = (req, res) => {

    db.Post.findOne({ _id: req.params.id })
    .exec()
    .then( (post) => {
        return res.status(200).json(post);;
    })
    .catch( (err) => {
        return res.status(500).json({
            message: err.message
        });
    });
};


// EDIT POST
postController.update = (req, res) => {

    db.Post.findOneAndUpdate( { _id: req.params.id }, { title: req.body.title }).exec()
    .then( (updatedPost) => {
        res.status(200).json({
            success: true,
            message: updatedPost
        });
    })
    .catch( (err) => {
        console.log('nu merge');
        return res.status(500).json({
            message: err
        });
    });
};


// DELETE A POST
postController.delete = (req, res) => {

    db.Post.findOneAndUpdate( { _id: req.params.id }, { isDeleted: true })
    .exec()
    .then( () => {
        res.status(200).json({
            success: true,
            message: 'post marked as deleted'
        });
    })
    .catch( (err) => {
        console.log('nu merge');
        return res.status(500).json({
            message: err
        });
    });
};


// LIKE A POST
postController.like = (req, res) => {

    db.Post.findOne({ _id: req.params.id })
    .exec()
    .then( (post) => {
       let userId = post.voters.filter( (id) => { id == req.user._id } )[0];
        if(!userId) {
            post.likes = post.likes + 1;
            post.voters.push(req.user._id);
            post.save().then( (likedPost) => {
                return res.status(202).json({
                    success: true,
                    message: likedPost
                });
            }).catch( (err) => {
                console.log('nu merge');
                return res.status(500).json({
                    message: err
                });
            });

        } else {
            return res.status(202).json({
                message: post
            });
        }
        

    }).catch( (err) => {
        console.log('nu merge');
        return res.status(500).json({
            message: err
        });
    });
};


// DISLIKE A POST
postController.dislike = (req, res) => {

    db.Post.findOne({ _id: req.params.id }).exec().then( (post) => {
        let userId = post.voters.filter( (id) => { id === req.params.id.toString() } )[0];
        if(userId) {
            likes = likes - 1;

            post.save().then( (dislikedPost) => {
                return res.status(202).json({
                    success: true,
                    message: dislikedPost
                });
            }).catch( (err) => {
                console.log('nu merge');
                return res.status(500).json({
                    message: err
                });
            });

        } else {
            return res.status(202).json({
                message: post
            });
        }

    }).catch( (err) => {
        console.log('nu merge');
        return res.status(500).json({
            message: err
        });
    });
};


module.exports = postController;