require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);
const express = require("express");
const cors = require('cors');
const dbConnection = require("./config/dbConnection");
const User = require('./models/userSchema');
const app = express();


// Mdiileware
app.use(express.json());
app.use(cors());

// Database Connection
dbConnection();


app.post('/registration', async (req, res)=>{
    let { email, passowrd, confirmPassword, terms} = req.body;

    let existingUser = await User.findOne({email : email});

    if(existingUser){
           return res.status(400).json({
                message : "This Email Already Exists"
            })
    }

    if(!terms){
       return res.send({
            message : "Please Accept Out Terms And Condition"
        })
    }

    if(!email || !password || confirmPassword){
        return res.status(400).json({
            message : "Please fill the all field"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            message : "Password Not Matched"
        })
    }

    let user = new User({
        email: email,
        password : password,
        terms : terms
    })
    user.save();
    res.status(201).json({
        message : "Registration Done"
    });
});


const port = process.env.PORT || 9000
app.listen(port, ()=>{
    console.log(`Server Is Running ${port}`)
});