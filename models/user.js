const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    quiz : [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref: 'Quiz'
        }
    ],
});

module.exports = mongoose.model('user', user);