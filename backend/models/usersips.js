const mongoose = require('mongoose');

const userip = new mongoose.Schema({
    ip: String,
    surveyid: String,
});

module.exports = mongoose.model('userip', userip);