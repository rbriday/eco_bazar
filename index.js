require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);
const express = require("express");
const dbConnection = require("./config/dbConnection");
const app = express();

// Mdiileware
app.use(express.json());

// Database Connection
dbConnection()

// mongodb+srv://ecobazar:IDsSZz15eEZgGAJq@cluster0.xvua968.mongodb.net/ecobazar?appName=Cluster0


app.get('/', (req, res)=>{
    res.send("hello")
});


const port = process.env.PORT || 9000
app.listen(port, ()=>{
    console.log(`Server Is Running ${port}`)
});