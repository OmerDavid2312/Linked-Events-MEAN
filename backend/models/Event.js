const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {type:String, required:true},
    description: {type:String, required:true},
    maxparticipants: {type:Number, required:true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    link: {type:String, required:true},
    participants:[{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    eventdate: { type : Date, default: Date.now }


},{
    timestamps: true
  });

module.exports = mongoose.model("Event", eventSchema);

