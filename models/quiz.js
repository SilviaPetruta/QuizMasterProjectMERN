const mongoose = require('mongoose');

const quiz = new mongoose.Schema ({
    score: { type: Number },
    time: { type: String }
});

module.exports = mongoose.model('Quiz', quiz);