const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models');

authCheck = (req, res, next) => {
    if (req.token) {
        jwt.verify(req.token, config.jwt.secret, (err, decoded) => {
            if (err)  {
                res.status(401).json({
                    message: 'Failed to authenticate token'
                });
            } else {
                db.User.findOne({_id: decoded.id}).exec().then((user) => {
                    req.user = user;
                    next();
                }).catch((err) => {
                    res.status(500).json({
                        message: err
                    });
                });
            }
        });
    } else {
        res.status(401).json({
            message: 'No token provided'
        });
    }
};


module.exports = authCheck;