const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const User = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String },
        username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: { unique: true } },
        email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: { unique: true } },
        password: { type: String, required: true },
    },
    { timestamps: true },
)

User.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('users', User)