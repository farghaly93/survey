const express = require('express');
const imageUpload = require('../middlewares/imageUpload');
const adminControls = require('../controllers/adminControls');
const router = express.Router();
const adminCheck = require('../middlewares/adminCheck');

router.post('/admin/addCat',adminCheck, adminControls.showName);
router.get('/admin/getCats', adminControls.getCats);
router.get('/admin/removeCat/:id',adminCheck, adminControls.removeCat);
router.get('/admin/removeStore/:id/:cat',adminCheck, adminControls.removeStore);
router.get('/admin/getCat/:id',adminCheck, adminControls.getCat);
router.get('/admin/getStore/:name/:cat', adminControls.getStore);
router.get('/admin/getAd/:name', adminControls.getAd);
router.get('/admin/getQuestions/:cat', adminControls.getQuestions);
router.post('/admin/addQuestion',adminCheck, adminControls.addQues);
router.get('/admin/getStores/:cat', adminControls.getStores);
router.get('/admin/getSections/:categ', adminControls.getSections);
router.post('/admin/addStore',adminCheck,imageUpload, adminControls.addStore);
router.post('/admin/addAd',adminCheck,imageUpload, adminControls.addAd);
router.post('/admin/addSections',adminCheck, adminControls.addSections);
router.post('/admin/addspecs',adminCheck, adminControls.addSpecs);
router.post('/admin/addbranch',adminCheck, adminControls.addBranch);
router.get('/admin/getChoices/:cat', adminControls.getChoices);
router.post('/admin/login', adminControls.login);
router.get('/admin/getbranch/:id', adminControls.getBranch);
router.get('/admin/getads', adminControls.getads);
router.get('/admin/isAdmin/:pass', adminControls.isAdmin);
router.post('/admin/deletebranch', adminControls.deleteBranch);
router.post('/admin/deletead', adminControls.deletead);
router.post('/admin/getbranchs', adminControls.getBranchs);


module.exports = router;