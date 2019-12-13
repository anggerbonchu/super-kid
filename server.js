require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const generalController = require('./controllers/atec');
const User = require('./models/atec');

const app = express();


const atecRoutes = require('./routes/atec');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(atecRoutes);
app.use(userRoutes);

mongoose
  .connect(
    process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
  }).then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
  });


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});