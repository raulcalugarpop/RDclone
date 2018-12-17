const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     minlength: [3, 'Username must be 3 characters'],
    //     unique: true
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password must be 5 characters.']
    },
    fullName: {
        type: String,
        required: true,
        minlength: [5, 'Password must be 5 characters minimum.']
    },
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

userSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            next(err);
        } else {
            user.password = hash;
            next();
        }
    });
});

const User = mongoose.model('User', userSchema);

User.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

module.exports = User;