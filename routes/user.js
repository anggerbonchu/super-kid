const path = require('path');
const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/register', userController.create);
router.post('/login', userController.login);
router.post('/change-password', userController.changePassword);
router.get('/logout', auth, userController.logout);


router.get('/user', auth, userController.getAll);
router.post('/add-kid', auth, userController.addKid);
router.get('/user/detail/:id', auth, userController.detail);
router.delete('/user/delete/:id', auth,userController.delete);

module.exports = router;
