require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);
const express = require("express");
const cors = require('cors');
const dbConnection = require("./config/dbConnection");
const { registrationController, loginController, forgotPasswordController, resetPasswordController, resentVerificationMail } = require('./controllers/authController');
const app = express();


// Mdiileware
app.use(express.json());
app.use(cors());

// Database Connection
dbConnection();


app.post('/registration', registrationController);
app.post('/login', loginController );
app.post('/forgotpassword', forgotPasswordController);
app.post('/resetpassword/:token', resetPasswordController);
app.post('/resentverificationemail', resentVerificationMail);


const port = process.env.PORT || 9000
app.listen(port, ()=>{
    console.log(`Server Is Running ${port}`)
});