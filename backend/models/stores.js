const mongoose = require('mongoose');

const stores = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: false},
    category: {type: String, required: true},
    image: {type: String, required: false},
});

module.exports = mongoose.model('Stores', stores);