const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const isAuth = require('../middlewares/is-auth');
const categoriesController = require('../controllers/categories');

const categoryValidation = [check('name').not().isEmpty().trim()];

router.get('',isAuth,categoriesController.allCategories);
router.get('/:id',isAuth,categoriesController.getCategory);
router.post('',categoryValidation,categoriesController.addCategory);


module.exports = router;


