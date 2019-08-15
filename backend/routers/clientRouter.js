const express = require('express');
const imageUpload = require('../middlewares/imageUpload');
const clientControls = require('../controllers/clientControls');
const validations = require('../controllers/validations');
const router = express.Router();

router.post('/client/addsurvey', validations.validate('survey'), clientControls.addSurvey);
router.post('/client/getCharts', clientControls.getCharts);
router.post('/client/getStars', clientControls.getStars);
router.post('/client/getlinedata', clientControls.getlinedata);
router.post('/client/addcomm', validations.validate('comment'), clientControls.addcomm);
router.post('/client/getcomms', clientControls.getcomms);
router.get('/client/searchstores/:q', clientControls.searchstores);
router.get('/client/unwindspecs/:cat/:spec', clientControls.unwindSpecs);
router.post('/client/topstores', clientControls.topStores);
router.post('/client/topstoresIn', clientControls.topStoresIn);
router.post('/client/updatemap', clientControls.updateMap);
router.post('/client/getmap', clientControls.getMap);
router.post('/client/getsectionitems', clientControls.getSectionItems);
router.get('/client/getSection/:cat/:store/:parent/:secnum', clientControls.getSection);
router.post('/client/filter', clientControls.filter);
router.get('/client/getip', clientControls.getIp);
router.get('/client/translate/:val/:lng', clientControls.Translate);
router.get('/client/mostvisited/:cat', clientControls.mostvisited);


module.exports = router;