const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const isAuth = require('../middlewares/is-auth');



const usersController = require('../controllers/users');

const loginValidation = [check('email').isEmail(),check('password').isLength({ min: 5 }).withMessage('Password must contain at least 5 character')];
const registerValidation = [check('email').isEmail(),check('password').isLength({ min: 5 }).withMessage('Password must contain at least 5 character'),check('name').trim()];

router.post('/login',loginValidation,usersController.login);
router.post('/register',registerValidation,usersController.register);
router.get('',isAuth,usersController.getUserDetails);

module.exports = router;
