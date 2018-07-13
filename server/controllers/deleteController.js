const db = require('../models');

const deleteController = {};

deleteController.delete = (req, res) => {

    db.User.deleteOne({ _id: req.params.id })
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

module.exports = deleteController;