const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const isAuth = require('../middlewares/is-auth');
const eventsController = require('../controllers/events');

const postEventValidation = [
    check('name').not().isEmpty().trim(),
    check('description').not().isEmpty().trim(),
    check('link').isURL()
    ];
    
//MY Events HUB
router.post('',isAuth,postEventValidation,eventsController.addEvent); //Post event
router.get('',isAuth,eventsController.createdEvents); //Get creator events
router.get('/:id',isAuth,eventsController.getEventById); // Get specific event
router.delete('/:id',isAuth,eventsController.deleteEventById); //Delete specific event
router.patch('/:id',isAuth,eventsController.updateEventById);// Update specific event

module.exports = router;