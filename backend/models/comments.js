const mongoose = require('mongoose');

const comments = new mongoose.Schema({
    category: {type: String, required: true},
    store: {type: String, required: true},
    section1: String,
    section2: String,
    section3: String,
    section4: String,
    section5: String,
    comment: String,
    date: Date
});

comments.pre("save", function() {
    this.date = new Date();
});

module.exports = mongoose.model('comments', comments);