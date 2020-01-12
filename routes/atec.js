const path = require('path');
const express = require('express');
const auth = require('../middleware/auth');
const atecController = require('../controllers/atec');
const router = express.Router();

router.get('/atec', auth, atecController.getAll);
router.get('/atec/detail/:id', auth, atecController.detail);
router.get('/atec/userId/:id', auth, atecController.getByUser);
// router.get('/atec/form', atecController.getByUser);


// router.get('/atec/report', atecController.getReport);
// router.get('/atec/report/:atecId', atecController.getReportDetail);

// // add validation here lately
// router.post('/atec/form-child', atecController.postFormChild);
// router.post('/atec/form-report', atecController.postFormReport);
// router.post('/atec/form-delete', isAuth, atecController.postFormDelete);


module.exports = router;
