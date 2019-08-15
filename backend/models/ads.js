const mongoose = require('mongoose');

const ads = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: false},
    image: {type: String, required: false},
});

module.exports = mongoose.model('Ads', ads);