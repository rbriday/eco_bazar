require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);
const express = require("express");
const cors = require('cors');
const dbConnection = require("./config/dbConnection");
const { registrationController } = require('./controllers/authController');
const app = express();


// Mdiileware
app.use(express.json());
app.use(cors());

// Database Connection
dbConnection();


app.post('/registration', registrationController);


const port = process.env.PORT || 9000
app.listen(port, ()=>{
    console.log(`Server Is Running ${port}`)
});