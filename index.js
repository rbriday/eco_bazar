const express = require("express");
const app = express();


app.get('/', (req, res)=>{
    res.send("hello")
});

app.listen(9000, ()=>{
    console.log("server Is Running")
});