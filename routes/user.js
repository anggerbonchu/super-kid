const path = require('path');
const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/logout', auth, userController.logout);

router.get('/user', auth, userController.getAll);
router.get('/user/detail/:id', auth, userController.detail);
router.delete('/user/delete/:id', auth,userController.delete);

module.exports = router;
