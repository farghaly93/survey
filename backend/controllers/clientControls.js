const Surveys = require('../models/survey');
const Comments = require('../models/comments');
const Stores = require('../models/stores');
const Summary = require('../models/summary');
const Questions = require('../models/questions');
const Locations = require('../models/locations');
const Userips = require('../models/usersips');
const gtranslate = require('google-translate-api');
const translate = require('translate');
const { validationResult } = require('express-validator/check');
const arabic = require('../../backend/translation-arabic.json');

exports.addSurvey = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            let mess = '';
            errors.errors.map(err=>mess += err.msg);
                res.status(200).json({done: mess});
                return;
        }
        const body = req.body;

        //const body = req.sanitize(req.body);
        //const newsurvey =await new Surveys(body).save();
        /////////////////////////////////////////////////
        const find = {category: body.category, store: body.store};
        const obj = {category: body.category, store: body.store,month: new Date().getMonth()+1, year: new Date().getFullYear()};
        for(let s=1;s<6;s++) {
            if(body['section'+s]) {
                find['section'+s] = body['section'+s];
                obj['section'+s] = body['section'+s];
            }
        }
        let add = true;
        let old = await Summary.find(obj);
        if(old.length>0) add = false;
        let surveyid = old[0]?old[0]._id:0;
        let ip = '::fftg3h4pff:175u5y0.90o51.3h5lk72.1';
        const userip = await Userips.find({surveyid, ip});
        if(userip.length>=0) {
            let updateanswers = [];

            for(let q=1;q<11;q++) {
                if(body['q'+q]) {
                    const findques =await Questions.find({category:body.category,question: 'q'+q});
                    if(findques.length>0) {
                        for(let cs=1;cs<6;cs++){ 
                            if(findques[0]['ch'+cs]) noc = cs+1;
                        }
                        for(let c=1;c<6;c++){
                            if(findques[0]['ch'+c] === body['q'+q]) {
                                updateanswers.push(Summary.updateOne(obj, {$inc: {['q'+q+'.'+(c-1)]: 1}}));
                                if(add) {
                                    let arr=[];
                                   for(let a=1;a<noc;a++) {
                                   if(a===c){arr.push(1)}else{arr.push(0)}
                                   }
                                   find['q'+q] = arr;
                                }
                            }
                        }
                    }
                }
            }
            const rate = ['one', 'two', 'three', 'four', 'five'];
            const rating = rate[body.rating-1];
            find['rating']=0;find[rating] = 1;find['num']=1; find['month'] = new Date().getMonth()+1, find['year']=new Date().getFullYear();
            if(add) {
                  addeddd1 = await new Summary(find).save();

                  let find2 = await Locations.find(body);
                  if(find2.length === 0) { 
                    body['status']="new";

                    addeddd2 = await new Locations(body).save();
                  }
                  await new Userips({surveyid:addeddd1._id, ip}).save();
                  done = "new survey added successfully..";
            }else {
                const newrate = (old[0].one+old[0].two*2+old[0].three*3+old[0].four*4+old[0].five*5+(+body.rating)) / (old[0].one + old[0].two + old[0].three + old[0].four + old[0].five+1);
                console.log(newrate);
                let addeddd = Summary.update(obj,  {$inc: {num: 1, [rating]: 1}});
                let addeddd2 = Summary.update(obj,  {$set: {rating: newrate}});
                let idip = new Userips({surveyid:old[0]._id, ip}).save();
                updateanswers.push(addeddd,addeddd2, idip);

                let u = await Promise.all(updateanswers); 
                 
                done = "survey added successfully..";
                }
            }else {
                done = "Yo have rated this store indeed..";
            }
                res.status(200).json({done});
    }catch(err) {
        res.json(err);
        console.log(err);
    }
};
exports.getCharts = async(req, res, next) => {
    try {
        let counts = [];
        let surv = 0;
        let summs = await Summary.find(req.body);
        console.log(summs);
        let sum =0;
        for(let summ of summs) {
            sum += summ.num;
            let answers = [];
            for(let q=1;q<11;q++) {
                if(summ['q'+q].length>0) {
                    answers[q-1] = summ['q'+q];
                    } 
                 }
                 counts[surv] = answers
            surv++;
        }
            const nor = counts.length;
            const noq = counts[0].length;
            let qs = [];
            for(let q=0;q<noq;q++) {
                let chs = [];
                for(let c=0; c<counts[0][q].length;c++) {
                    let subsum = 0;
                    for(let r=0;r<nor;r++) {
                        subsum += counts[r][q][c];
                    }
                    chs[c] = subsum;
                }
                qs[q] = chs; 
            }
            let qsnames = []
            for(let q=1;q<noq+1;q++) {
                const choices = await Questions.find({category: req.body.category, question: 'q'+q})
                let choicesnames = [];
                for(let c=1;c<7;c++) {
                    if(choices[0]['ch'+c]) {
                        choicesnames[c-1] = choices[0]['ch'+c];
                    }
                }
                qsnames[q-1] = choicesnames;
            }
            let percents= [];
            for(let r=0; r<qs.length;r++) {
                let oneq = [];
                for(let q=0;q<qs[r].length;q++) {
                   oneq[q] = {_id: qsnames[r][q], percent: (qs[r][q]/sum)*100};
                }
                percents[r] = oneq;
            }
         res.status(200).json({percents, sum});
    }catch(err) {
        res.json(err);
    }
};

exports.getStars = async(req, res, next) => {
    try {
            let summs = await Summary.find(req.body);
            let stars = 0;
            let sum = 0;
            for(let summ of summs) {
                stars += summ.rating*summ.num;
                sum += summ.num;
            }
            total = stars/sum;
            res.status(200).json({total});
    }catch(err) {
        res.json(err);
    }
};
exports.getlinedata = async(req, res, next) => {
    try { 
        const body = req.body;
        const year = new Date().getFullYear();
        let data = [];
        body['year'] = year;
        for(let m=1; m<13; m++) {
            body['month'] = m;
        let rates = await Summary.find(body);
        let sum = 0;
        let i = 0;  
        if(rates.length>0) {
        for(let rate of rates) {
            if(typeof rate.rating === 'number') {
            sum += rate.rating;
            i++;
           }
        }
            data[m-1] = (sum/i);
           // console.log(data);
         }else {
             if(m <= new Date().getMonth()) {
                 data[m-1] = (data[m-2] || 0);
             }
        }
    }
        res.status(200).json({data});
    }catch(err) {
        res.json(err);
    }
};
exports.getSection = async(req, res) => {
    let secnum = +req.params.secnum+1;
    let parent;
    let cat = req.params.cat;
    parent = req.params.parent;
    const obj ={};
    obj['category'] = cat;
    if(req.params.store !=='null') obj['store'] = req.params.store;
    if(parent !=='no'){obj['section'+(secnum)] = parent;secnum++}
    const surveys = await Locations.find(obj);
    let sectionlist = [];
    let list = [];

    surveys.map(sec=>{
        list.push(sec['section'+(secnum)]);
    });
    list.map(item=>{
        if(sectionlist.indexOf(item) >= 0){
            sectionlist[sectionlist.indexOf(item)] = item;
        }else {
            sectionlist.push(item);
        }
    });

    res.status(200).json({sectionlist});
};
exports.addcomm = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        let mess = '';
        if(!errors.isEmpty()) {
            errors.errors.map(err=>mess += err.msg);
            return;
        }
        const body = req.body;
        const newcomment =await new Comments(body).save();
        delete body['comment'];
        const comments =await Comments.find(body);
        if(newcomment) {
            res.status(200).json({comments, mess});
        }
    }catch(err) {
        res.json(err);
    }
};
exports.getcomms = async(req, res, next) => {
    try {
        const body = req.body;
        const comments =await Comments.find(body);
            res.status(200).json({comments});
    }catch(err) {
        res.json(err);
    }
};
exports.searchstores = async(req, res, next) => {
    try {
        const stores =await Stores.find({name: req.params.q});
        //console.log(stores);
            res.status(200).json({stores});
    }catch(err) {
        res.json(err);
    }
};
exports.topStores = async(req, res, next) => {
    try {
        let top = [];
        let topmain = [];
        let topbranchs = [];
        const tops = await Summary.topStores(req.body).limit(8);
        for(let m of tops) {
           const name = m._id;
            const store = await Stores.find({category: req.body.category, name});
            if(tops.length>0) {
                if(store.length>0) {
                    topmain.push({category: store[0]['category'], name: m._id, image: store[0]['image'],rate: m.rate});
                    }else {
                        topbranchs.push({branch: m._id, rate: m.rate});
                    }
                }
            }

           res.status(200).json({topmain, topbranchs});
    }catch(err) {
        res.json(err);
    }
};
exports.topStoresIn = async(req, res, next) => {
    try {
        let top = [];
        const tops = await Summary.topStoresIn(req.body).limit(6);
        for(let m of tops) {
            const store = await Stores.find({category: req.body.category, name: m._id});
            if(store.length>0) {
                top.push({category: store[0]['category'], name: m._id, image: store[0]['image'],rate: m.rate});
                }
            }
            //console.log(top);
           res.status(200).json({top: top});
    }catch(err) {
        res.json(err);
    }
};
exports.updateMap = async(req, res, next) => {
    try {
        let body = req.body;
        const find = {category: body.category, store: body.store};
        for(let sec=1;sec<11;sec++) {
            if(body['section'+sec]) {
                find['section'+sec] = body['section'+sec];
            }
        }
        const location = await Locations.find(find);
        if(location.length===0) {
            body['status']="new"
             update = await new Locations(body).save();
        }

        if(update) {
           res.status(200).json({done: true});
        }
    }catch(err) {
        res.json(err);
    }
};
exports.getMap = async(req, res, next) => {
    try {
        let body = req.body;
        if(body.section1) {fixed = 3; zoom = 7.5;}
        if(body.section2) {fixed = 6; zoom = 11.5}
        if(body.section3) {fixed = 9; zoom = 15}
        if(body.section4) {fixed = 14; zoom = 18;}
        const location = await Locations.find(body);
        let specs = [];
        if(location.length === 1) {
            for(let i=1;i<6;i++){
                if(location[0]['spec'+i]){
                    specs[i-1] = location[0]['spec'+i];
                }
        }
    }
    res.status(200).json({phone: location[0].phone, address: location[0].address, review: location[0].review, status: location[0].status, specs, zoom,coords: {lat: location[0].lat, lng: location[0].lng}});

    }catch(err) {
        res.json(err);
    }
};
exports.getSectionItems = async(req, res, next) => {
    try {
        const body = req.body;
        const sections = await Locations.find(body.filter);
        let items = [];
        let s =0;

        for(let sec of sections) {
            if(sec[body.find] && !items.includes(sec[body.find])) {
                items[s] = sec[body.find];
            }
            s++;
        }
            if(body.find === 'store') {
                let st =0;
                for(let store of items) {
                    storeobj = await Stores.find({category: body.filter.category,name: store});
                    rates = await Summary.find(body.filter);
                    let sum = 0;
                    let r =0;
                    for(let rate of rates) {
                        r += rate.rating*rate.num;
                        sum += rate.num;
                    }
                    let rating = r/sum;
                    let storeobject =  {name: storeobj[0].name, image: storeobj[0].image, _id: storeobj[0]._id, desc: storeobj[0].desc, rating };
                    
                     items[st] = storeobject;

                    st++;
                }
            }
            //console.log(items);

            res.status(200).json({items});
    }catch(err) {
        res.json(err);
    }
};
exports.unwindSpecs = async(req, res, next) => {
    try {
        let cat = req.params.cat;
        let specsnum = +req.params.spec;
        let values = [];
        for(let i=1;i<specsnum+1;i++){
                const valuesobj = await Locations.groupspecs(cat, i);
                values[i-1] = valuesobj;
        }
            res.status(200).json({values});
    }catch(err) {
        res.json(err);
    }
};
exports.filter = async(req, res, next) => {
    try {
        const obj = req.body.obj;
        const filter = obj;
        if(obj['lat'] && obj['lng']) {
            filter['lat'] = {$gte: obj['lat'], $lte: obj['lat']+.045 }
            filter['lng'] = {$gte: obj['lng'], $lte: obj['lng']+.045 }
        }
        const skip = req.body.skip;
        const limit = req.body.limit;
        const f = Locations.find(filter).skip(skip).limit(limit);
        const c = Locations.find(obj).count();
        let items = [];
        [filteredItems, count] = await Promise.all([f, c]);

        for(item of filteredItems) {
            let itemobj = {category: item.category,store:item.store};
            for(let s=1;s<6;s++){
                if(item['section'+s]) {
                    itemobj['section'+s] = item['section'+s];
                }
            }
            let summs = await Summary.find(itemobj);
            let stars = 0;
            let sum = 0;
            for(let summ of summs) {
                stars += summ.rating*summ.num;
                sum += summ.num;
            }
            let total = stars/sum;

            itemobj['lat'] = item.lat;
            itemobj['lng'] = item.lng;
            itemobj['image'] = item.image[0]?item.image[0].image:null;
            itemobj['status'] = item.image[0]?'existed':'new';
            itemobj['rating'] = total;
            itemobj['_id'] = item._id;
            itemobj['phone'] = item.phone;
            itemobj['address'] = item.address;
            for(let sp=1;sp<7;sp++) {
                if( item['spec'+sp]) {
                    itemobj['spec'+sp] = item['spec'+sp];
                }
            }

            items.push(itemobj);
        }
        res.status(200).json({items, count});
    }
    catch(err) {
        res.status(401).json({mess:'a7a', err});
    }
};
exports.getIp = async(req, res, next) => {
    try {
        const ip = req.connection.remoteAddress;
         res.status(200).json({ip});
    }catch(err) {
        res.json(err);
    }
};
exports.mostvisited = async(req, res) => {
    const cat = req.params.cat;
    let most = [];
    const mostv = await Summary.mostvisited(cat).limit(8);
    for(let m of mostv) {
        const store = await Stores.find({category: cat, name: m._id});
        if(store.length>0) {
            most.push({category: cat,name: m._id, image: store[0]['image']});
            }
        }

    res.json({most});
}
exports.Translate = (req, res) => {
    try {
        const val = req.params.val;
        const text = arabic[val];
        res.json({word: text});
    }catch(err) {
    };
}
