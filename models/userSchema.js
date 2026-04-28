const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName : {
        type: String,
    },
    lastName : {
        type: String
    },
    email: {
        type: String
     },
    passowrd : {
        type: String
    },
    phoneNumber: {
        type : String
    },
    terms :{
        type: Boolean
    },
    profile :{
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role : {
        type: String,
        enum : ['admin', 'user', 'editor', 'vendor' ],
        default: 'user'
    },
    isHold :{
        type: Boolean,
        default: false
    },
    billingAddress : {
        firstName : {
            type: String
        },
        lastName : {
            type: String
        },
        email: {
            type:String
        },
        phoneNumber : {
            type: String
        },
        companyName : {
            type: String
        },
        streetAddress : {
            type: String
        },
        country :{
            type: String
        },
        states : {
            type : String
        },
        zipCode : {
            type: String
        }
    }
})


module.exports = mongoose.model ("User", userSchema );
