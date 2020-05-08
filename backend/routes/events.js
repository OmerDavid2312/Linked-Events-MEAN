const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-auth');
const eventsController = require('../controllers/events');

router.get('',isAuth,eventsController.showEvents); //Events to Join  
router.get('/popular',isAuth,eventsController.popularEvents); //Popular Events 
router.get('/new',isAuth,eventsController.newEvents); // New Events
router.get('/basedProfile',isAuth,eventsController.eventsBasedProfile); //Suggests Events based last joined events 
router.get('/category/:id',isAuth,eventsController.showEventsByCategory); //Events By Category
router.get('/id/:id',isAuth,eventsController.showSpecificEvent); //Specific event to Join
router.patch('/join/:id',isAuth,eventsController.joinEvent); //Join event push to array
router.get('/joined',isAuth,eventsController.showJoinedEvent);//Events the user already joined


module.exports = router;