const db = require('../models');

const deleteController = {};

deleteController.delete = (req, res) => {
    db.User.remove({ _id: req.params.userId })
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'deleted user'
        });
        console.log("deleted user " + _id);
    })
    .catch();
};

module.exports = deleteController;