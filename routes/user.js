const path = require('path');
const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/login', userController.login);
router.get('/logout', auth, userController.logout);

router.get('/user', auth, userController.getAll);
router.get('/user/detail/:id', auth, userController.detail);
router.post('/user/create', auth, userController.create);
router.delete('/user/delete/:id', auth,userController.delete);

module.exports = router;
