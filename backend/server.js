const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const usersRoute = require('./routes/users');
const categoriesRoute = require('./routes/categories');
const myeventsRoute = require('./routes/my-events');
const eventsRoute = require('./routes/events');

const app = express();

//Connect to MongoDB
mongoose.connect(process.env.MONGO,{useNewUrlParser:true,useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });

//Configs
app.use(cors());
app.use(bodyparser.json());


//Routes
app.use('/api/users',usersRoute);
app.use('/api/categories',categoriesRoute);
app.use('/api/myevents',myeventsRoute);
app.use('/api/events',eventsRoute);



app.listen(PORT,()=>{
    console.log('Server is running on port ' + PORT);
})