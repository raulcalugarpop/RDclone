const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        //required: true,
        minlength: [3, 'Username must be 3 characters'],
        unique: true },
    email: {
        type: String,
        //required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: {
        type: String,
        //required: true,
        minlength: [5, 'Password must be 5 characters']},
    firstName: {
        type: String },
        //required: true },
    lastName: {
        type: String },
        //required: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;