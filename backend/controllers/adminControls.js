const Categories = require('../models/categories');
const Questions = require('../models/questions');
const Stores = require('../models/stores');
const Ads = require('../models/ads');
const Sections = require('../models/sections');
const Admins = require('../models/admins');
const Locations = require('../models/locations');
const Summary = require('../models/summary');
const jwt = require('jsonwebtoken');

exports.login = async(req, res, next) => {
    try {
        let isAdmin = false;
        const admin =await Admins.findOne({password: req.body.pass});
        let token;
        if(admin) {
            isAdmin = true;
             token = jwt.sign(
                {},
                'mohammadfarghalyalisaadawydevelopersurvey',
                {expiresIn: '1h'}
            )
        }
        res.status(200).json({isAdmin, token, expDate:6000});
    }catch(err) {
        res.json(err);
    }
};
exports.showName = async(req, res)=> {
    try{
        const body = req.body;
        if(body.mode==='edit') {
            const del = await Categories.deleteOne({name: body.name});
        }
        const add = await new Categories(body).save();

        if(add._id) {res.json({added: true});} else {res.json({added: false});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.getCats = async(req, res)=> {
    try{
        const cats = await Categories.find();
        res.status(200).json({cats});
    }
    catch(err) {
        res.json({err});
    }
};
exports.removeCat = async(req, res)=> {
    try{
        const id = req.params.id;
        const cat = await Categories.findOne({_id: id});
        const del1 = Categories.deleteOne({_id: id});
        const del2 = Questions.deleteMany({category: cat.name});
        [d1, d2] = await Promise.all([del1, del2]);
        const cats = await Categories.find();
        if(d1&&d2) { res.status(200).json({cats, done: true});}else{res.status(200).json({cats, done: false});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.removeStore = async(req, res)=> {
    try{
        const id = req.params.id;
        const del1 = await Stores.deleteOne({_id: id});
        const stores = await Stores.find({category: req.params.cat});
        if(del1&&stores) { res.status(200).json({stores, done: true});}else{res.status(200).json({stores, done: false});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.getCat = async(req, res)=> {
    try{
        const id = req.params.id;
        const cat = await Categories.findOne({_id: id});
        let qs = [];
        for(let i =1; i<11; i++ ) {
            if(cat['q'+i]) {
                qs[i-1] = cat['q'+i];
            }
        }
        res.status(200).json({qs, name: cat.name});
    }
    catch(err) {
        res.json({err});
    }
};
exports.getStore = async(req, res)=> {
    try{
        const name = req.params.name;
        const cat = req.params.cat;
        const store = await Stores.findOne({name: name, category: cat});

        res.status(200).json({store});
    }
    catch(err) {
        res.json({err});
    }
};
exports.getAd = async(req, res)=> {
    try{
        const name = req.params.name;
        const store = await Ads.findOne({name: name});

        res.status(200).json({store});
    }
    catch(err) {
        res.json({err});
    }
};
exports.addQues = async(req, res)=> {
    try{
        if(req.body['mode'] === 'edit') {
            await Questions.deleteMany({category: req.body.category});
        }
        const cat = await new Questions(req.body).save();
        if(cat){res.status(200).json({added: true});}else{res.status(200).json({added: false});}
    }
    catch(err) {
        res.json({err});
    }
};

exports.getStores = async(req, res)=> {
    try{
        const stores = await Stores.find({category: req.params.cat});

        res.status(200).json({stores});
    }
    catch(err) {
        res.json({err});
    }
};
exports.addStore = async(req, res)=> {
    try{
        const body = req.body;
        
        if(req.file) {
            body.image = req.protocol+'://'+req.hostname+':3000/images/'+req.file.filename;
        }
        let store = 0;let add, update;
        store = await Stores.find({name: body.name, category: body.category}).count();

        if(store>0) {
            update = await Stores.updateOne({name: body.name, category: body.category},{desc: body.desc, image: body.image});

        }else {
            add = await new Stores(body).save();
        }
        if(add || update) res.status(200).json({mess: 'added successfully...'});
    }catch(err) {
        res.json({err});
    }
};
exports.addAd = async(req, res)=> {
    try{
        const body = req.body;
        if(req.file) {
            body.image = req.protocol+'://'+req.hostname+':3000/images/'+req.file.filename;
        }
        let store = 0;let add, update;
        store = await Ads.find({name: body.name}).count();

        if(store>0) {
            update = await Ads.updateOne({name: body.name},{name: body.name,desc: body.desc, image: body.image});

        }else {
            add = await new Ads(body).save();
        }
        if(add || update) res.status(200).json({mess: 'added successfully...'});
    }catch(err) {
        res.json({err});
    }
};
exports.addSections = async(req, res)=> {
    try{
        if(req.body.mode === 'edit') {
           await Sections.deleteMany({category: req.body.category});
        }
        const body = req.body;
        const added = await new Sections(body).save() ||  await Sections.update({category: req.body.category},body);
        if(added){res.status(200).json({done: true});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.getSections = async(req, res)=> {
    try{
       const sections = await Sections.findOne({category: req.params.categ});
        res.status(200).json({sections});
    }
    catch(err) {
        res.json({error:err});
    }
};
exports.getSecChoices = async(req, res)=> {
    try{
       const choicesObjs = await Sections.find({section: req.params.section, category: req.params.category});
       const choices = choicesObjs.map(obj=>obj.name);
       res.status(200).json({choices});
    }
    catch(err) {
        res.json({error:err});
    }
};
exports.getQuestions = async(req, res)=> {
    try{
        let questions = [];
        let specs = [];
        const category = await Categories.findOne({name: req.params.cat});
       for(let i=1; i<11;i++) {
            if(category['q'+i]) {
                questions[i-1] = category['q'+i];
            }
       }
       for(let x=1; x<6;x++) {
        if(category['spec'+x]) {
            specs[x-1] = category['spec'+x];
            }
        }
        res.status(200).json({questions, specs});
    }
    catch(err) {
        res.json({error:err});
    }
};
exports.getChoices = async(req, res)=> {
    try{
        let allchoices = [];
        const n = Questions.find({category: req.params.cat}).count();
        const c = Questions.find({category: req.params.cat});
        [num, choices] = await Promise.all([n, c]);
        for(let i=0;i<num;i++) {
            let qcs = [];
            for(let j=1;j<7;j++) {
                if(choices[i]['ch'+j]) {
                    qcs[j-1] = choices[i]['ch'+j];
                }
            }
            const q = choices[i]['question'][1];
            allchoices[q-1]=qcs;
        }       
        res.status(200).json({allchoices});
    }
    catch(err) {
        res.json({error:err});
    }
};
exports.addSpecs = async(req, res)=> {
    try{
        const body = req.body;
        const added = await Categories.update({name: body.filter}, body.obj);
        if(added){res.status(200).json({done: true});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.addBranch = async(req, res)=> {
    try{
         let body = {...req.body.obj};
         let obj = {...req.body.obj};
         let id;
         obj['status']="existed";

        if(req.body.find) {
            find = {...req.body.find};
            id = req.body.find._id;
            delete find['_id']; delete find['lat']; delete find['lng'];  delete find['id'];  delete find['status'];  delete find['__v'];
            delete find['spec2']; delete find['spec3']; delete find['spec4']; delete find['spec5']; delete find['spec6']; delete find['spec1'];
        }
        if(id) {
             added = await Locations.update({_id: id}, obj);
             added2 = await Summary.update(find, body);
        }else {
            const branch = await Locations.find(find);
            if(branch.length===0) {
                added = await new Locations(obj).save();
            }

    }   obj['_id']=id;
        if(added){res.status(200).json({branch: obj, done: true});}else{res.status(200).json({done: false});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.getBranch = async(req, res)=> {
    try{
        const id = req.params.id;
        const branch = await Locations.findById(id);
        if(branch){res.status(200).json({branch});}else{res.status(200).json({done: false});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.getBranchs = async(req, res)=> {
    try{
        const body = req.body;
        let obj = {category: body.obj.category};
        for(let s=0;s<6;s++) {
            if(body.obj['section'+s]){
                obj['section'+s] = body.obj['section'+s]
            }
        }
        const f = Locations.find(obj).sort({status: -1}).skip(body.skip).limit(body.limit);
        const c = Locations.find(obj).count();
        [items, count] = await Promise.all([f, c]);
        res.status(200).json({items, count});
    }
    catch(err) {
        res.json({err});
    }
};
exports.deleteBranch = async(req, res)=> {
    try{
        const body = req.body;

        let obj = {category: body.category, store: body.store};
        for(let s=0;s<6;s++) {
            if(body['section'+s]){
                obj['section'+s] = body['section'+s]
            }
        }

        const dfl = await Locations.deleteOne({_id:body._id});
        const dfs = await Summary.deleteMany(obj);
        if(dfl&& dfs){res.status(200).json({_id: body._id});}else{res.status(200).json({done: false});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.deletead = async(req, res)=> {
    try{
        const body = req.body;

        let ad_id = {_id: body._id};

        const dfl = await Ads.deleteOne({_id: ad_id});
        if(dfl){res.status(200).json({_id: ad_id});}
    }
    catch(err) {
        res.json({err});
    }
};
exports.getads = async(req, res)=> {
    try{
        const ads = await Ads.find();
        res.status(200).json({ads});
    }
    catch(err) {
        res.json({err});
    }
};
exports.isAdmin = async(req, res) => {
    let isAdmin = false;
    const password = req.params.pass;
    admin = await Admins.find({password});
    if(admin.length>0) {
        isAdmin = true;
    }
    res.status(200).json({isAdmin})
}
