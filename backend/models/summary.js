const mongoose = require('mongoose');

const summary = new mongoose.Schema({
    category: String,
    store: String,
    section1: String,
    section2: String,
    section3: String,
    section4: String,
    section5: String,
    q1: Array,   
    q2: Array,   
    q3: Array,   
    q4: Array,   
    q5: Array,   
    q6: Array,   
    q7: Array,   
    q8: Array,   
    q9: Array,   
    q10: Array,  
    one:  {type: Number, default: 0},
    two:  {type: Number, default: 0},
    three:  {type: Number, default: 0},
    four:  {type: Number, default: 0},
    five:  {type: Number, default: 0},
    rating: {type: Number, default: 0},
    month: Number,
    year: Number,
    num: Number
});

summary.pre('save', function(next){
    this.rating = (this.one+this.two*2+this.three*3+this.four*4+this.five*5)/(this.one+this.two+this.three+this.four+this.five); 
    console.log(this.rating);
    next();
});


summary.pre('update', function(next){
    //this.update({}, {rating: (this.one+this.two*2+this.three*3+this.four*4+this.five*5)/(this.one+this.two+this.three+this.four+this.five)});
    console.log(this.one);
    next();
});

summary.statics.topStores = function(obj) {
    let field = '$store';
    if(obj['store']) field = '$section1';
    if(obj['section1']) field = '$section2';
    if(obj['section2']) field = '$section3';
    if(obj['section3']) field = '$section4';
    if(obj['section4']) field = '$section5';
    let arr = [];
    Object.keys(obj).map(k=>{
        if(obj[k]!=='') {
            arr.push({$match: {[k]: obj[k]}});
        }
    })
    arr.push({$unwind: field});
    arr.push({$group: {_id: field, ratesum: {$sum: '$rating'}, sum: {$sum: 1}}});
    arr.push({$project: {rate: {$divide: ['$ratesum','$sum']}}});
    arr.push({$sort: {rate: -1}});
    return this.aggregate(arr);
}
summary.statics.topStoresIn = function(obj) {
    let arr = [];
    Object.keys(obj).map(k=>{
        if(obj[k]!=='') {
            arr.push({$match: {[k]: obj[k]}});
        }
    })
    arr.push({$unwind: '$store'});
    arr.push({$group: {_id: '$store', ratesum: {$sum: '$rating'}, sum: {$sum: 1}}});
    arr.push({$project: {rate: {$divide: ['$ratesum','$sum']}}});
    arr.push({$sort: {rate: -1}});
    //console.log(arr);
    return this.aggregate(arr);
}

summary.statics.mostvisited = function(category) {
    //console.log(category);
    return this.aggregate([
        {$match: {category}},
        {$unwind: '$store'},
        {$group: {_id: '$store',  sum: {$sum: '$num'}}},
        {$sort: {sum: -1}}
    ])}



module.exports = mongoose.model('summaries', summary);