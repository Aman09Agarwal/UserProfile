const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userDetails = require('./route/api/userDetails');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("MongoDB connected..."))
    .catch((err)=>console.log(err));

//Use Routes
app.use('/api/user', userDetails);
    
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));