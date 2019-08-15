const mongoose = require('mongoose');

const sections = new mongoose.Schema({
    category: {type: String, required: true, unique: true},
    section1: String,
    section2: String,
    section3: String,
    section4: String,
    section5: String,
});

module.exports = mongoose.model('sections', sections);