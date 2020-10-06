const {Schema, model} = require('mongoose');

const QuizSchema = new Schema ({
    score: { type: Number },
    time: { type: String }
});

module.exports = model('Quiz', QuizSchema);