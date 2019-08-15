const mongoose = require('mongoose');
const Summery = require('./summary');
const locations = new mongoose.Schema({
    category: String,
    store: String,
    lat: Number,
    lng: Number,
    section1: String,
    section2: String,
    section3: String,
    section4: String,
    section5: String,
    spec1: String,
    spec2: String,
    spec3: String,
    spec4: String,
    spec5: String,
    status: String,
    phone: Number,
    address: String,
    review: String,
});
locations.virtual('image',{
    ref: 'Stores',
    localField: 'store',
    foreignField: 'name',
});
locations.virtual('details', {
    ref: 'summeries',
    localField: 'store',
    foreignField: 'store',
});

locations.statics.groupspecs = function(cat, spec) {
    return this.aggregate([
        {$match: {category: cat}},
        {$unwind: '$spec'+spec },
        {$group: {_id: '$spec'+spec, count: {$sum: 1}}}
    ]);
}

locations.set('toObject', { virtuals: true });
locations.set('toJSON', { virtuals: true });

locations.pre('find', function(next){
    this.populate('image');
    //this.populate('details');
    next();
});

module.exports = mongoose.model('locations', locations);