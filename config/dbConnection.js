const mongoose = require("mongoose");

let dbConnection = ()=>{
    mongoose.connect(process.env.DATABASE_CONNECTION).then(()=>{
    console.log("Database is connected")
})
}

module.exports = dbConnection