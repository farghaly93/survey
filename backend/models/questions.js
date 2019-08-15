const mongoose = require('mongoose');

const questions = new mongoose.Schema({
    category: String,
    type: String,
    question: String,
    ch1: String,
    ch2: String,
    ch3: String,
    ch4: String,
    ch5: String,
    ch6: String,
});

module.exports = mongoose.model('Questions', questions);