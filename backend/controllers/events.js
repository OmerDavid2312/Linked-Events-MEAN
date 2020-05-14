const Event = require('../models/Event');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


//POST Creator Add Event
exports.addEvent = async (req,res,next) =>{

     //validation
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
     }

    try {

        const creator = req.userData._id;
        const {name,description,maxparticipants,category,link,eventdate} = req.body;
        
        const event = await new Event({
            creator:creator,
            name:name,
            description:description,
            maxparticipants:maxparticipants,
            category:category,
            link:link,
            eventdate:eventdate
        });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);

        
    } catch (error) {
        res.status(500).json({message: 'Faild to add Event'});
        
    }
}
//GET Creator Events
exports.createdEvents = async (req,res,next) =>{

    try {
        const creator = req.userData._id;
        
        const createdEvents = await Event.find({creator:creator}).populate('creator',['name']).populate('category').populate('participants'['name']).sort({eventdate:-1});
        if(createdEvents.length==0) return res.status(404).json({message:"Cant find Events"});

        res.status(200).json(createdEvents);

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}

//GET Creator Event by ID
exports.getEventById = async (req,res,next) =>{

    try {
        const eventId = req.params.id;
        const creator = req.userData._id;
        
        
        const specificEvent = await Event.findOne({_id:eventId,creator:creator}).populate('creator',['name']).populate('category').populate('participants'['name']);
        if(!specificEvent) return res.status(404).json({message:"Cant find Event or not legal action"});

        res.status(200).json(specificEvent);

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}

//DELETE Creator Event
exports.deleteEventById = async (req,res,next) =>{

    try {
        const eventId = req.params.id;
        const creator = req.userData._id;
        
        const specificEvent = await Event.findOne({_id:eventId,creator:creator});
        if(!specificEvent) return res.status(404).json({message:"Cant find Event or not legal action"});
        
        const deleteEvent = await Event.findByIdAndRemove(eventId);

        res.status(200).json({message:`The event ${specificEvent.name} has deleted!`})

        
    } catch (error) {
        res.status(500).json({message: 'Faild to delete Events'});
    }
}
//UPDATE Creator Event
exports.updateEventById = async (req,res,next) =>{

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }    
    try {
        const eventId = req.params.id;
        const creator = req.userData._id;
        const {name,description,maxparticipants,category,link,eventdate} = req.body;
        
        const eventUpdate = await Event.findOne({_id:eventId,creator:creator});
        if(!eventUpdate) return res.status(404).json({message:"Cant find Event or not legal action"});
        const updateEve = await eventUpdate.updateOne({name:name,description:description,maxparticipants:maxparticipants,category:category,link:link,eventdate:eventdate})
        
        res.status(200).json({message:`The event ${name} has updated!`})

        
    } catch (error) {
        res.status(500).json({message: 'Faild to update Events'});
    }
}

////////////////////////////////////////////////////////////////////////////////
//GET Events to join
exports.showEvents = async (req,res,next) =>{

    try {
        const userId = req.userData._id;
        
        const events = await Event.find({creator:{$ne: userId},eventdate:{$gte:new Date().toISOString()}}).populate('creator',['name']).populate('category').populate('participants'['name']);
        if(events.length==0) return res.status(404).json({message:"Cant find Events"});
   
       
        res.status(200).json(events); 

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}

//GET Events based Joined Events
exports.eventsBasedProfile = async (req,res,next) =>{

    try {
        const categoriesSuggestions = [];
        const userId = req.userData._id;
        //check Joined Events
        const joinedEvents = await Event.find({participants:userId});
        if(joinedEvents.length==0) return res.status(404).json({message:'No Joined Events'});
        for (let event of joinedEvents)
        {
           categoriesSuggestions.push(event.category);
        }
        //get suggestions based categoties of last joined Events
        const events = await Event.find({creator:{$ne: userId},category: { $in: categoriesSuggestions },participants:{$ne: userId},eventdate:{$gte:new Date().toISOString()}}).populate('creator',['name']).populate('category').populate('participants'['name']).limit(6);
        if(events.length==0) return res.status(404).json({message:"Cant find Events"});
            
        res.status(200).json(events); 
     
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}
//GET New Events
exports.newEvents = async (req,res,next) =>{

    try {
        const userId = req.userData._id;
        
        const events = await Event.find({creator:{$ne: userId},eventdate:{$gte:new Date().toISOString()}}).populate('creator',['name']).populate('category').populate('participants'['name']).sort({createdAt:-1}).limit(6);
        if(events.length==0) return res.status(404).json({message:"Cant find Events"});
        
        res.status(200).json(events); 
     
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}
//GET Events By Category
exports.showEventsByCategory = async (req,res,next) =>{

    try {
        const userId = req.userData._id;
        const categoryid = req.params.id;
        //pagination
        const page = req.params.page || 1; 
        const eventsPerPage = 6;
    
        const events = await Event.find({creator:{$ne: userId},category:categoryid,eventdate:{$gte:new Date().toISOString()}})
        .skip(eventsPerPage*(page-1))
        .limit(eventsPerPage)
        .populate('creator',['name'])
        .populate('category')
        .populate('participants'['name']);
        if(events.length==0) return res.status(404).json({message:"Cant find Events"});
        const count = await Event.find({creator:{$ne: userId},category:categoryid,eventdate:{$gte:new Date().toISOString()}}).countDocuments()
   
       
        res.status(200).json({
            count:count,
            data:events
        }); 

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}
//GET popular events to join 6
exports.popularEvents = async(req,res,next)=>{
    
    try {
        const userId = req.userData._id;
        
        const events_aggregate_pipeline = await Event.aggregate([
            {
                $match: { creator: { $ne: mongoose.Types.ObjectId(userId) },eventdate:{$gte:new Date()} },
            },
            {
                $lookup: {
                    from: 'users',
                    let: { participants: '$participants' },
                    pipeline: [
                        { $match: { $expr: { $in: [ '$_id', '$$participants' ] } } },
                        { $project: { name: 1 } },
                    ],
                    as: 'participants',
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    let: { category: '$category' },
                    pipeline: [ { $match: { $expr: { $eq: [ '$_id', '$$category' ] } } }, { $project: { name: 1, icon:1 } } ],
                    as: 'category',
                },
            },
            { $unwind: '$creator' },
            { $unwind: '$category' },
            { $addFields: { participants_size: { $size: '$participants' } } },
            { $sort: { participants_size: -1 } },
            { $limit: 6}
        ]);
        
        // top events by 6 
        res.status(200).json(events_aggregate_pipeline); 

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events!!'});
    }

}

//GET specific Event
exports.showSpecificEvent = async (req,res,next) =>{

    try {
        const eventId = req.params.id;
        
        const event = await Event.findById(eventId).populate('creator',['name']).populate('category').populate('participants'['name']);
        if(!event) return res.status(404).json({message:"Cant find event"});

        res.status(200).json(event);

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Event'});
    }
}

//PATCH Join to Event
exports.joinEvent = async (req,res,next) =>{

     //validation
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
     }

    try {
      const eventId = req.params.id; 
      const userId = req.userData._id; 
      
      const event = await Event.findById(eventId);
      if(!event) return res.status(404).json({message:"Cant find event"})

      //Check if user is already in the event
     const isSign = await Event.findOne({_id:eventId,participants:userId});
     if(isSign) return res.status(500).json({message:'You are already attending the Event'});

     if(event.participants.length == event.maxparticipants) return res.status(500).json({message:'The Event is Full'});
      
      const updateEvent = await Event.updateOne({_id:eventId},{ $push: { participants: userId } });

      res.status(200).json({message:`you joined to event`});
    } catch (error) {
        res.status(500).json({message:"faild join event"})
    }
    

}

//GET Joined Events
exports.showJoinedEvent = async (req,res,next) =>{

    try {
        const userId = req.userData._id;
        
        const joinedEvents = await Event.find({participants:userId}).populate('creator',['name']).populate('category').populate('participants'['name']).sort({eventdate:-1});
        if(joinedEvents.length==0) return res.status(404).json({message:"Cant find Events"});

        res.status(200).json(joinedEvents);

        
    } catch (error) {
        res.status(500).json({message: 'Faild to get Events'});
    }
}


