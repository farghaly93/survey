const mongoose = require('mongoose');

const admins = new mongoose.Schema({
    password: {type: String, required: true},
});

module.exports = mongoose.model('admins', admins);