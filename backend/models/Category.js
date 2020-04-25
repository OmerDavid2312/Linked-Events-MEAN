const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    tag : {type:String}
});

module.exports = mongoose.model("Category", categorySchema);
