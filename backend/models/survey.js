const mongoose = require('mongoose');

const surveys = new mongoose.Schema({
    section1: String,
    section2: String,
    section3: String,
    section4: String,
    section5: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    q6: String,
    q7: String,
    q8: String,
    q9: String,
    q10: String,
    q10: String,
    rating: Number,
    category: String,
    store: String,
    ipaddress: String,
    date: Date
});

module.exports = mongoose.model('surveys', surveys);