const mongoose = require('mongoose');

const categories = new mongoose.Schema({
    name: {type: String, unique: true},
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    q6: String,
    q7: String,
    q8: String,
    q9: String,
    spec: String,
    spec1: String,
    spec2: String,
    spec3: String,
    spec4: String,
    spec5: String,
});

module.exports = mongoose.model('Catergories', categories);